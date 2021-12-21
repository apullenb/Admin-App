import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_STAR_PRODUCTS_WITH_PAGE } from '../utils/StartPointQueries';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CaretUp, CaretDown } from 'react-bootstrap-icons';

import { Redirect } from 'react-router-dom';
import Pagination from './Pagination';
import getPermissions from './Selector';
import { connect } from 'react-redux';
import SpinnerLoader from '../GlobalComponents/ZilisSpinnerLoader';

export const StarPointAccountList = (props) => {
  const tableHeadings = [
    { name: 'Inventory', colId: 'inventoryId' },
    { name: 'Active', colId: 'isActive' },
    { name: 'SKU', colId: 'productSku' },
    { name: 'Name', colId: 'description' },
    { name: 'Category', colId: 'category' },
    { name: 'Country', colId: 'country' },
    { name: 'StarPoints', colId: 'points' },
    { name: 'Actions', coloId: 'actions' },
  ];
  const {view, edit, permissionFeched, PermissionsError}=props;
  const [starPointDataFiltered, setStarPointDataFiltered] = useState([]);
  const [starPointData, setStarPointData] = useState([]);
  const [tHeaderData, setTHeadData] = useState();
  const [skip, setSkip] = useState(0);
  const [perPageNum, setPerPageNum] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [filter, setFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState({ ['inventoryId']: 'ASC' });
  const { loading, data, refetch ,error} = useQuery(GET_STAR_PRODUCTS_WITH_PAGE, {
    variables: { skip: skip, take: perPageNum, filterJson: filter, order: sortOrder },
    refetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!error) 
    {setTHeadData(tableHeadings);}
  }, []);

  useEffect(() => {
   if (data) 
   {applyFilter();}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPageNum, skip, filterObj, sortOrder]);

  useEffect(() => {
   if(data?.starShipInventoryWithPaging){
     setStarPointDataFiltered(data.starShipInventoryWithPaging.items);
     setStarPointData(data.starShipInventoryWithPaging.items);
     setHasNextPage(data.starShipInventoryWithPaging.pageInfo.hasNextPage);}
  }, [data?.starShipInventoryWithPaging]);

  const applyFilter = () => {
    var localObject = {};
    Object.keys(filterObj).forEach((inputName) => {
      if (filterObj[inputName] || filterObj[inputName] === 0) {
        if (filter) {
          localObject = { ...filter };
          // eslint-disable-next-line no-prototype-builtins
          if (filter.hasOwnProperty('and') && inputName !== 'inventoryId' && inputName !== 'isActive') {
            localObject['and'].forEach((objOne, index) => {
              Object.keys(objOne)[0] === inputName ? localObject['and'].splice(index, 1) : null;
            });
            localObject['and'].push({ [inputName]: { startsWith: filterObj[inputName] } });
          } else {
            localObject['and'].forEach((objOne, index) => {
              Object.keys(objOne)[0] === inputName ? localObject['and'].splice(index, 1) : null;
            });
            localObject['and'].push({ [inputName]: { eq: filterObj[inputName] } });
          }
          setFilter({ ...localObject });
        } else {
          if (inputName !== 'inventoryId' && inputName !== 'isActive') {
            localObject = { and: [{ [inputName]: { startsWith: filterObj[inputName] } }] };
          } else {
            localObject = { and: [{ [inputName]: { eq: filterObj[inputName] } }] };
          }
          setFilter(localObject);
        }
      } else if (filterObj[inputName] === '' || isNaN(filterObj[inputName])) {
        filter &&
          filter['and'] &&
          filter['and'].map((obj, i) => {
            Object.keys(obj)[0] === `${inputName}` ? filter['and'].splice(i, 1) : null;
          });
      }
    });
    if (filter && filter['and'].length === 0) {
      setFilter(null);
    }

    setTimeout(() => {
      refetch();
    }, 1000);
  };

  const truncateText = (maxCount, textToTruncate) => {
    //console.log(textToTruncate.split(''));
    //const texttrimmed = textToTruncate.trim();
    //console.log(texttrimmed.split(''));
    return textToTruncate.length > maxCount ? textToTruncate.trim().slice(0, 10) : textToTruncate;
  };

  // eslint-disable-next-line no-unused-vars
  const filterTable = (e) => {
    const id = e.target.id;
    const notChar = id === 'inventoryId' || id === 'isActive';
    const searchValue = notChar ? e.target.value : e.target.value.toLowerCase();

    const filtered = starPointData.filter((value) => {
      const val = notChar ? String(value[id]) : value[id].toLowerCase();
      return val.includes(searchValue);
    });

    setStarPointDataFiltered(filtered);
  };

  const updatePerPage = (num) => {
    setPerPageNum(parseInt(num));
  };

  const handleUpdateSkip = (num) => {
    setSkip(num);
  };

  const handleEnterKey = (e) => {
    e.key === 'Enter' || e.key === 'Backspace' ? updateInputValue(e) : null;
  };

  const updateInputValue = (e) => {
    var newVal;
    if (e.target.id === 'inventoryId' || e.target.id === 'isActive') {
      newVal = { ...filterObj, [e.target.id]: parseInt(e.target.value) };
    } else {
      newVal = { ...filterObj, [e.target.id]: e.target.value };
    }
    setFilterObj(newVal);
  };

  const handleSort = (colName, sortDirection) => {
    const sort = { [colName]: sortDirection };
    setSortOrder(sort);
  };

  return (
    <TableWrapper>
      <PageTitle>StarPoint Products</PageTitle>
      {permissionFeched ?
      (!PermissionsError && view?<>
      <Table>
        <thead style={{ height: '50px' }}>
          <tr style={{ height: '30px' }}>
            <TH>
              <SearchInput
                id='inventoryId'
                type='text'
                placeholder=' Inventory ID'
                onKeyUp={(e) => {
                  handleEnterKey(e);
                }}
                onBlur={(e) => {
                  updateInputValue(e);
                }}
              />
            </TH>
            <TH>
              <select
                defaultValue='no-value'
                id='isActive'
                style={{ width: '80%', border: '1px solid #0f4b8f', height: '35px', color: '#707070' }}
                onChange={(e) => {
                  updateInputValue(e);
                }}
              >
                <option disabled value='no-value'>
                  Yes / No
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
                <option value={String(NaN)}>None</option>
              </select>
            </TH>
            <TH>
              <SearchInput
                id='productSku'
                type='text'
                placeholder=' SKU'
                onKeyUp={(e) => {
                  handleEnterKey(e);
                }}
                onBlur={(e) => {
                  updateInputValue(e);
                }}
              />
            </TH>
            <TH>
              <SearchInput
                id='description'
                type='text'
                placeholder='Name'
                onKeyUp={(e) => {
                  handleEnterKey(e);
                }}
                onBlur={(e) => {
                  updateInputValue(e);
                }}
              />
            </TH>
            <TH>
              <SearchInput
                id='category'
                type='text'
                placeholder='Category'
                onKeyUp={(e) => {
                  handleEnterKey(e);
                }}
                onBlur={(e) => {
                  updateInputValue(e);
                }}
              />
            </TH>
          </tr>
          <tr style={{ borderBottom: '1px solid #707070', height: '50px' }}>
            {tHeaderData &&
              tHeaderData.map((data, index) => {
                return (
                  <TH style={{ width: '12.5%', flexDirection: 'row', backgroundColor: '#f4fafe' }} key={index}>
                    <SORTWRAPPER>
                      {data.name == 'Actions' ? (edit&&<SORTCOLUMNTITLE>{data.name}</SORTCOLUMNTITLE>):<SORTCOLUMNTITLE>{data.name}</SORTCOLUMNTITLE>}
                      {data.name !== 'Actions' && (
                        <SORTICONWRAPPER>
                          <CaretUp
                            className='caretIcons'
                            id={data.colId}
                            onClick={() => {
                              handleSort(data.colId, 'ASC');
                            }}
                          />
                          <CaretDown
                            className='caretIcons'
                            id={data.colId}
                            onClick={() => {
                              handleSort(data.colId, 'DESC');
                            }}
                          />
                        </SORTICONWRAPPER>
                      )}
                    </SORTWRAPPER>
                  </TH>
                );
              })}
          </tr>
        </thead>
        <tbody style={{ height: '160px', fontSize: '18px' }}>
          {starPointDataFiltered && starPointDataFiltered.length === 0 ? (
            <tr>
              <td colSpan={tableHeadings.length}>
                <h3 style={{ textAlign: 'center' }}>No Data Found</h3>
              </td>
            </tr>
          ) : (
            starPointDataFiltered &&
            starPointDataFiltered.map((data, index) => {
              return (
                <TR key={index}>
                  <TD>{data.inventoryId}</TD>
                  <TD>{data.isActive === 1 ? 'Yes' : 'No'}</TD>
                  <TD>{data.productSku}</TD>

                  <OverlayTrigger
                    trigger={['hover', 'hover']}
                    key={index}
                    placement='bottom'
                    overlay={
                      <Tooltip bsPrefix='zls-tooltip' id={`tooltip-${data.productSku}-desc`}>
                        {/*zls-tooltip class is in app.scss to override Boostrap styling*/}
                        {data.description}
                      </Tooltip>
                    }
                  >
                    <TD>
                      {data.description ? truncateText(10, data.description) : 'No Text'}{' '}
                      <FontAwesomeIcon style={{ color: '#0f4b8f' }} icon={faInfoCircle} />
                    </TD>
                  </OverlayTrigger>
                  <TD>{data.category}</TD>
                  <TD>{data.country}</TD>
                  <TD>{data.points}</TD>
                  <TD>
                    {edit && <Link style={{ textDecoration: 'underline', color: '#0f4b8f' }} to={{ pathname: `/StartPoint/Edit/${data.inventoryId}` }}>
                        Edit
                      </Link>
                    }
                  </TD>
                </TR>
              );
            })
          )}
        </tbody>
      </Table>

      <Pagination updatePerPage={updatePerPage} handleUpdateSkip={handleUpdateSkip} hasNextPage={hasNextPage} />
      </>: <Redirect to='/NoPermission'/> ):<SpinnerLoader/> }
    </TableWrapper>
  );
};

export default connect(getPermissions)(StarPointAccountList);

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  max-width: 1475px;
  font-family: Segoe UI;
  color: #707070;
  text-align: left;
`;

const PageTitle = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 2% 0;
`;

const Table = styled.table`
  width: 100%;
`;

const TH = styled.th`
  font-size: 20px;
  font-weight: 400;
  padding-left: 2%;
`;

const TR = styled.tr`
  height: 50px;

  :nth-child(even) {
    background-color: #f4fafe;
  }

  :hover {
    background-color: rgba(15, 75, 143, 0.6);
    color: #fff;
  }
`;

const TD = styled.td`
  padding-left: 2%;
`;

const SearchInput = styled.input`
  width: 90%;
  border: 1px solid #0f4b8f;
`;

const SORTWRAPPER = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 995px) {
    flex-direction: column;
  }
`;

const SORTCOLUMNTITLE = styled.p`
  display: flex;
  align-items: center;
  margin: 0 10% 0 0;

  @media (max-width: 995px) {
    width: 100%;
  }
`;

const SORTICONWRAPPER = styled.div`
  width: 50%;
  @media (max-width: 995px) {
    width: 100%;
  }
`;
