import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_STAR_PRODUCTS, GET_STAR_PODUCTS_BY_ID } from '../utils/StartPointQueries';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ZilisLoader from '../GlobalComponents/ZilisLoader';
import Pagination from './Pagination';

export const StarPointAccountList = () => {
  const tableHeadings = ['Inventory', 'Active', 'SKU', 'Name', 'Category', 'StarPoints', 'Actions'];
  const [starPointDataFiltered, setStarPointDataFiltered] = useState([]);
  const [starPointData, setStarPointData] = useState([]);
  const [tHeaderData, setTHeadData] = useState();
  const [perPageNum, setPerPageNum] = useState(10);
  const { loading, error, data } = useQuery(GET_STAR_PRODUCTS);

  useEffect(() => {
    setTHeadData(tableHeadings);
  }, []);

  useEffect(() => {
    data && setStarPointDataFiltered(data.starShipInventory);
    data && setStarPointData(data.starShipInventory);
  }, [data]);

  const truncateText = (maxCount, textToTruncate) => {
    return textToTruncate.length > maxCount
      ? textToTruncate
          .split('')
          .map((char, i) => {
            if (i <= maxCount) return char;
          })
          .join('')
      : textToTruncate;
  };

  const filterTable = (e) => {
    const id = e.target.id;
    const searchValue = e.target.value;
    const filtered = starPointData.filter((value) => {
      return String(value[id]).includes(searchValue);
    });
    setStarPointDataFiltered(filtered);
  };

  const updatePerPage = (num) => {
    setPerPageNum(num);
  };

  return (
    <TableWrapper>
      <PageTitle>StarPoint Products</PageTitle>
      {loading && <ZilisLoader />}
      <Table>
        <thead style={{ height: '50px' }}>
          <tr style={{ height: '30px' }}>
            <TH>
              <SearchInput
                id="inventoryId"
                type="text"
                placeholder=" Inventory ID"
                onChange={(e) => {
                  filterTable(e);
                }}
              />
            </TH>
            <TH>
              <select
                id="isActive"
                style={{ width: '70%', border: '1px solid #0f4b8f', height: '35px' }}
                onChange={(e) => {
                  filterTable(e);
                }}
              >
                <option disabled selected value>
                  --Active--
                </option>
                <option value="1">True</option>
                <option value="0">False</option>
                <option value="">None</option>
              </select>
            </TH>
            <TH>
              <SearchInput
                id="productSku"
                type="text"
                placeholder=" SKU"
                onChange={(e) => {
                  filterTable(e);
                }}
              />
            </TH>
            <TH>
              <SearchInput
                id="description"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  filterTable(e);
                }}
              />
            </TH>
            <TH>
              <SearchInput
                id="category"
                type="text"
                placeholder="Category"
                onChange={(e) => {
                  filterTable(e);
                }}
              />
            </TH>
            <TH>Records Found: {starPointDataFiltered.length}</TH>
          </tr>
          <tr style={{ borderBottom: '1px solid #707070', height: '50px' }}>
            {tHeaderData &&
              tHeaderData.map((data, index) => {
                return (
                  <TH style={{ width: '14.28%' }} key={index}>
                    {data}
                  </TH>
                );
              })}
          </tr>
        </thead>
        <tbody style={{ height: '160px', fontSize: '18px' }}>
          {starPointDataFiltered && starPointDataFiltered.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <h3 style={{ textAlign: 'center' }}>No Data Found</h3>
              </td>
            </tr>
          ) : (
            starPointDataFiltered &&
            starPointDataFiltered.map((data, index) => {
              return (
                <TR key={index}>
                  <TD>{data.inventoryId}</TD>
                  <TD>{data.isActive === 1 ? 'True' : 'False'}</TD>
                  <TD>{data.productSku}</TD>

                  <OverlayTrigger
                    trigger={['hover', 'hover']}
                    key={index}
                    placement="bottom"
                    overlay={
                      <Tooltip bsPrefix="zls-tooltip" id={`tooltip-${data.productSku}-desc`}>
                        {/*zls-tooltip class is in app.scss to override Boostrap styling*/}
                        {data.description}
                      </Tooltip>
                    }
                  >
                    <TD>
                      {data.description ? truncateText(16, data.description) : 'No Text'} <FontAwesomeIcon style={{ color: '#0f4b8f' }} icon={faInfoCircle} />
                    </TD>
                  </OverlayTrigger>

                  <TD>{data.category}</TD>
                  <TD>{data.points}</TD>
                  <TD>
                    {
                      <Link style={{ textDecoration: 'underline', color: '#0f4b8f' }} to={{ pathname: `/StartPoint/Edit/${data.inventoryId}` }}>
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

      <Pagination updatePerPage={updatePerPage} />
    </TableWrapper>
  );
};

export default StarPointAccountList;

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
