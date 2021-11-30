import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_STAR_PODUCTS_BY_ID } from '../utils/StartPointQueries';
import { UPDATE_STAR_PRODUCT } from '../utils/StartPointMutations';
import { useToasts } from 'react-toast-notifications';

import ZilisLoader from '../GlobalComponents/ZilisLoader';
import ImageOverlay from '../GlobalComponents/ImageOveralay';

const EditStarPoint = () => {
  const sizes = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large', 'XXXX-Large'];
  const assetRootUrl = 'https://extranet.securefreedom.com/zilis/Shopping/Images/';
  const placeHolderImg = 'https://res.cloudinary.com/zilis/image/upload/v1637998439/zilis/Common_Images/placeholder_image_grey_yg9qaj.png';
  const { inventoryId } = useParams();
  const { loading, data } = useQuery(GET_STAR_PODUCTS_BY_ID, { variables: { inventoryId: parseInt(inventoryId) } });
  const [productData, setProductData] = useState({});
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [size, setSize] = useState(null);
  const [show, setShow] = useState(false);
  const [updateStarProduct] = useMutation(UPDATE_STAR_PRODUCT);
  const { addToast } = useToasts();

  useEffect(() => {
    data && setProductData(data.starShipInventory[0]);
    data && setCategory(data.starShipInventory[0].category);
    data && setDescription(data.starShipInventory[0].description);
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
          description,
        },
      });
      console.log(response);
      addToast(`Starship with SKU: ${productData.productSku} updated successfully!`, {
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

  const handleHide = (value) => {
    setShow(value);
  };

  return (
    <MainWrapper>
      {loading && <ZilisLoader isFullPage={true} />}
      <TopContentWrapper>
        <PageTitle>Edit StarPoint Product</PageTitle>
        <Link style={{ color: '#0F4B8F', textDecoration: 'underline', width: '50%', display: 'flex', justifyContent: 'flex-end' }} to={'/StarPoint'}>
          Back to List
        </Link>
      </TopContentWrapper>
      <ContentOuterWrapper>
        <ImageWrapper>
          <img
            onClick={(e) => {
              e.preventDefault();
              productData.smallImage && setShow(true);
            }}
            title="Click to zoom"
            style={productData.smallImage ? { width: '350px', height: '350px', cursor: 'pointer' } : { width: '350px' }}
            src={productData.smallImage ? `${assetRootUrl + productData.smallImage}` : placeHolderImg}
            alt="Product"
          />
        </ImageWrapper>

        <ContentWrapper>
          <InnerContentWrapper>
            <Content>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '120px' }}>Inventory ID</td>
                    <td style={{ width: '300px' }}>{productData.inventoryId}</td>
                  </tr>
                  <tr>
                    <td>SKU</td>
                    <td>{productData.productSku}</td>
                  </tr>
                </tbody>
              </table>
            </Content>
            <Content>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Country</td>
                    <td>{productData.country}</td>
                  </tr>
                  <tr>
                    <td style={{ width: '120px' }}>BV</td>
                    <td style={{ width: '300px' }}>{productData.points}</td>
                  </tr>
                </tbody>
              </table>
            </Content>
          </InnerContentWrapper>

          <InnerContentWrapper style={{ borderTop: '3px solid #707070' }}>
            <Content>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '120px' }}>StarPoint Value</td>
                    <td style={{ width: '300px' }}>
                      <CustomInput
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
                      <CustomInput
                        type="text"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        style={{ margin: '3% 0', width: '235px', border: '1px solid #0F4B8F' }}
                        rows="3"
                        type="text"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Content>

            <Content>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '60px' }}>
                    <td style={{ width: '120px' }}>Size</td>
                    <td style={{ width: '300px' }}>
                      {size ? (
                        <CustomSelect
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
                        </CustomSelect>
                      ) : (
                        'Sizes not available for product'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td> Is Active</td>
                    <td>
                      <CustomSelect
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
                      </CustomSelect>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Content>
          </InnerContentWrapper>
          <BottomContentWrapper>
            <SaveButton
              onClick={(e) => {
                updateStartProduct(e);
              }}
            >
              Save
            </SaveButton>
          </BottomContentWrapper>
        </ContentWrapper>
      </ContentOuterWrapper>
      <ImageOverlay show={show} handleHide={handleHide} src={productData.smallImage} rootUrl={assetRootUrl} />
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
  font-size: 20px;

  @media (max-width: 1295px) {
    width: 90%;
  }
`;
const ContentOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;

  @media (max-width: 1295px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
`;

const TopContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: row;
  width: 100%;

  @media (max-width: 595px) {
    align-items: center;
    flex-direction: column;
  }
`;

const PageTitle = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin: 2% 0;

  @media (max-width: 595px) {
    justify-content: center;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 75%;
  margin-left: 3%;
`;

const InnerContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  text-align: left;
  padding: 2% 0;

  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  text-align: left;

  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const BottomContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1050px) {
    margin-top: 15%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SaveButton = styled.button`
  background-color: #0f4b8f;
  color: white;
  width: 130px;
  height: 36px;
  border: none;

  @media (max-width: 595px) {
    width: 80%;
    height: 45px;
  }
`;

const CustomInput = styled.input`
  width: 235px;
  height: 36px;
  border: 1px solid #0f4b8f;
`;

const CustomSelect = styled.select`
  width: 150px;
  height: 36px;
  border: 1px solid #0f4b8f;
`;
