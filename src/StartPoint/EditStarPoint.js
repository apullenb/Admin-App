import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_STAR_PODUCTS_BY_ID } from '../utils/StartPointQueries';

const EditStarPoint = () => {
  const { inventoryId } = useParams();
  const { loading, error, data } = useQuery(GET_STAR_PODUCTS_BY_ID, { variables: { inventoryId: Number(inventoryId) } });
  const [productData, setProductData] = useState({});

  useEffect(() => {
    console.log(data);
    data && setProductData(data.starShipInventory[0]);
  }, [data]);

  return (
    <MainWrapper>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', width: '100%' }}>
        <PageTitle>Edit StarPoint Product</PageTitle>
        <Link style={{ color: '#0F4B8F', textDecoration: 'underline', width: '10%' }} to={'/StarPoint'}>
          Back to List
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '25%' }}>
          <img style={{ width: '350px', height: '350px' }} src={`https://extranet.securefreedom.com/zilis/Shopping/Images/${productData.smallImage}`} alt="Product" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '75%', marginLeft: '3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', textAlign: 'left', padding: '2% 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '150px' }}>Inventory ID</td>
                    <td style={{ width: '150px' }}>{productData.inventoryId}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{productData.country}</td>
                  </tr>
                  <tr>
                    <td>SKU</td>
                    <td>{productData.productSku}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '150px' }}>Description</td>
                    <td style={{ width: '150px' }}>{productData.description}</td>
                  </tr>
                  <tr>
                    <td>Star Points</td>
                    <td>{productData.points}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', textAlign: 'left', padding: '2% 0%', borderTop: '3px solid #707070' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '150px' }}>StarPoint Value</td>
                    <td style={{ width: '150px' }}>
                      <input style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }} type="text" value={productData.points} />
                    </td>
                  </tr>
                  <tr>
                    <td> Category</td>
                    <td>
                      <input style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }} type="text" value={productData.category} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '150px' }}>Size</td>
                    <td style={{ width: '150px' }}>
                      <select style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }}>
                        <option disabled selected>
                          Yes/No
                        </option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td> Is Active</td>
                    <td>
                      <select style={{ width: '150px', height: '36px', border: '1px solid #0F4B8F' }}>
                        <option disabled selected>
                          Yes/No
                        </option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ backgroundColor: '#0F4B8F', color: 'white', width: '130px', height: '36px', border: 'none' }}>Save</button>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default EditStarPoint;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  max-width: 1475px;
  font-family: Segoe UI;
  color: #707070;
`;

const PageTitle = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 2% 0;
`;

// <p>Inventory ID</p> <p>{productData.inventoryId}</p>
// <p>Country</p> <p>{productData.country}</p>
// <p>SKU</p> <p>{productData.productSku}</p>
