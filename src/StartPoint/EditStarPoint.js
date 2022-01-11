import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_STAR_PODUCTS_BY_ID, GET_STAR_PRODUCTS_WITH_PAGE } from '../utils/StartPointQueries';
import { Redirect } from 'react-router-dom';
import { UPDATE_STAR_PRODUCT } from '../utils/StartPointMutations';
import { useToasts } from 'react-toast-notifications';
import ZilisLoader from '../GlobalComponents/ZilisLoader';
import ImageOverlay from '../GlobalComponents/ImageOveralay';
import getPermissions from './Selector';
import { connect } from 'react-redux';
import SpinnerLoader from '../GlobalComponents/ZilisSpinnerLoader';

const EditStarPoint = (props) => {
  const sizes = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large', 'XXXX-Large'];
  const assetRootUrl = 'https://extranet.securefreedom.com/zilis/Shopping/Images/';
  const placeHolderImg = 'https://res.cloudinary.com/zilis/image/upload/v1637998439/zilis/Common_Images/placeholder_image_grey_yg9qaj.png';
  const { inventoryId } = useParams();
  const { loading, data, refetch } = useQuery(GET_STAR_PODUCTS_BY_ID, {
    variables: { inventoryId: parseInt(inventoryId) },
    refetchPolicy: 'no-cache',
  });
  const {view,edit,permissionFeched} = props
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
    if (data?.starShipInventory) {
      setProductData(data.starShipInventory[0]);
      setCategory(data.starShipInventory[0].category);
      setDescription(data.starShipInventory[0].description);
      setPoints(data.starShipInventory[0].points);
      setIsActive(data.starShipInventory[0].isActive);
      setSize(data.starShipInventory[0].size);
    }
  }, [data?.starShipInventory]);

  const updateStartProduct = async (e) => {
    e.preventDefault();
    const _inventoryId = parseInt(inventoryId);
    const _points = parseInt(points);
    const country = productData.country;
    try {
      await updateStarProduct({
        variables: {
          _inventoryId,
          _points,
          isActive,
          size,
          country,
          description,
        },
      });
      addToast(`Starship with SKU: ${productData.productSku} updated successfully!`, {
        appearance: 'success',
        autoDismiss: true,
      });
      refetch();
    } catch (error) {
      addToast('Save was unsuccessful. Please refresh the page and try again. Contact IT if the problem continues.', {
        appearance: 'error',
      });
    }
  };

  const handleHide = (value) => {
    setShow(value);
  };

  return (
    <MainWrapper>
      {permissionFeched? 
      (view?<>
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
            title='Click to zoom'
            style={productData.smallImage ? { width: '350px', height: '350px', cursor: 'pointer' } : { width: '350px' }}
            src={productData.smallImage ? `${assetRootUrl + productData.smallImage}` : placeHolderImg}
            alt='Product'
          />
        </ImageWrapper>

        <ContentWrapper>
          <InnerContentWrapper>
            <Content>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <TDLable style={{ width: '120px' }}>Inventory ID</TDLable>
                    <TDContent style={{ width: '300px' }}>{productData.inventoryId}</TDContent>
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
                    <TDLable>BV</TDLable>
                    <TDContent>{productData.points}</TDContent>
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
                    <TDLable>StarPoint Value</TDLable>
                    <TDContent>
                      <CustomInput
                        type='text'
                        readOnly={!edit}
                        value={points}
                        onChange={(e) => {
                          setPoints(e.target.value);
                        }}
                      />
                    </TDContent>
                  </tr>
                  <tr>
                    <td> Category</td>
                    <td>
                      <CustomInput
                        type='text'
                        readOnly={!edit}
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
                        rows='3'
                        type='text'
                        readOnly={!edit}
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
                    <TDLable>Size</TDLable>
                    <TDContent>
                      {size ? (
                        <CustomSelect
                          defaultValue='no-value'
                          style={{ width: '235px', height: '36px', border: '1px solid #0F4B8F' }}
                          readOnly={!edit}
                          value={size}
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                        >
                          <option disabled value='no-value'>
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
                    </TDContent>
                  </tr>
                  <tr>
                    <td> Is Active</td>
                    <td>
                      <CustomSelect
                        defaultValue='no-value'
                        value={parseInt(isActive)}
                        onChange={(e) => {
                          {edit && setIsActive(parseInt(e.target.value))};
                        }}
                      >
                        <option disabled value='no-value'>
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
                edit && updateStartProduct(e);
              }}
            >
              Save
            </SaveButton>
          </BottomContentWrapper>
        </ContentWrapper>
      </ContentOuterWrapper>
      <ImageOverlay show={show} handleHide={handleHide} src={productData.smalleImage ? productData.smallImage : ''} rootUrl={assetRootUrl} />
      </>:<Redirect to='/NoPermission'/> ) : <SpinnerLoader/>}
    </MainWrapper>
  );
};

export default connect(getPermissions)(EditStarPoint);

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

const TDLable = styled.td`
  width: 120px;
`;

const TDContent = styled.td`
  width: 300px;
`;
