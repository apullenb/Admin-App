import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_STAR_PODUCTS_BY_ID } from '../utils/StartPointQueries';
import { UPDATE_STAR_PRODUCT } from '../utils/StartPointMutations';
import { useToasts } from 'react-toast-notifications';

import ZilisLoader from '../GlobalComponents/ZilisLoader';

const EditStarPoint = () => {
  const sizes = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large', 'XXXX-Large'];
  const { inventoryId } = useParams();
  const { loading, error, data } = useQuery(GET_STAR_PODUCTS_BY_ID, { variables: { inventoryId: parseInt(inventoryId) } });
  const [productData, setProductData] = useState({});
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [size, setSize] = useState(null);
  const [updateStarProduct] = useMutation(UPDATE_STAR_PRODUCT);
  const { addToast } = useToasts();

  useEffect(() => {
    data && setProductData(data.starShipInventory[0]);
    data && setCategory(data.starShipInventory[0].category);
    data && setPoints(data.starShipInventory[0].points);
    data && setIsActive(data.starShipInventory[0].isActive);
    data && setSize(data.starShipInventory[0].size);
  }, [data]);

  const updateStartProduct = async (e) => {
    e.preventDefault();
    const _inventoryId = parseInt(inventoryId);
    const _points = parseInt(points);
    const country = productData.country;
    try {
      const response = await updateStarProduct({
        variables: {
          _inventoryId,
          _points,
          isActive,
          size,
          country,
        },
      });
      console.log(response);
      addToast('Starship updated successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (error) {
      console.log('There was and error', error);
      addToast('An error occured while updating!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <MainWrapper>
      {loading && <ZilisLoader />}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', width: '100%' }}>
        <PageTitle>Edit StarPoint Product</PageTitle>
        <Link style={{ color: '#0F4B8F', textDecoration: 'underline', width: '10%' }} to={'/StarPoint'}>
          Back to List
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '25%' }}>
          <img
            style={productData.smallImage ? { width: '350px', height: '350px' } : { width: '350px' }}
            src={productData.smallImage ? `https://extranet.securefreedom.com/zilis/Shopping/Images/${productData.smallImage}` : 'https://res.cloudinary.com/zilis/image/upload/v1637998439/zilis/Common_Images/placeholder_image_grey_yg9qaj.png'}
            alt="Product"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '75%', marginLeft: '3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', textAlign: 'left', padding: '2% 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '120px' }}>Inventory ID</td>
                    <td style={{ width: '300px' }}>{productData.inventoryId}</td>
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
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '120px' }}>Description</td>
                    <td style={{ width: '300px' }}>{productData.description}</td>
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
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '120px' }}>StarPoint Value</td>
                    <td style={{ width: '300px' }}>
                      <input
                        style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }}
                        type="text"
                        value={points}
                        onChange={(e) => {
                          setPoints(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> Category</td>
                    <td>
                      <input
                        style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }}
                        type="text"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '50%', textAlign: 'left' }}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '120px' }}>Size</td>
                    <td style={{ width: '300px' }}>
                      {size ? (
                        <select
                          style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }}
                          value={size}
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            --Size--
                          </option>
                          {sizes.map((size, index) => {
                            return (
                              <option key={index} value={size}>
                                {size}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        'Sizes not available for product'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td> Is Active</td>
                    <td>
                      <select
                        style={{ width: '150px', height: '36px', border: '1px solid #0F4B8F' }}
                        value={parseInt(isActive)}
                        onChange={(e) => {
                          setIsActive(parseInt(e.target.value));
                        }}
                      >
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
            <button
              onClick={(e) => {
                updateStartProduct(e);
              }}
              style={{ backgroundColor: '#0F4B8F', color: 'white', width: '130px', height: '36px', border: 'none' }}
            >
              Save
            </button>
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
