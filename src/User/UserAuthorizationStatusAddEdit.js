import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import moment from "moment";
import { connect } from "react-redux";
import getComponentData from "./selector";

const options = [
  { id: 1, value: "Not Allowed" },
  { id: 2, value: "View" },
  { id: 3, value: "Edit" },
  { id: 4, value: "Approve" },
  { id: 5, value: "View and Edit" },
  { id: 6, value: "View, Edit and Approve" },
];

const UserAuthorizationStatusAddEdit = (props) => {

  const [userPermission, setUserPermission] = useState([]);
  const [shopConfigCountryPermssion, setShopConfigCountryPermission] = useState(null);
  const [shopConfigKitsPermssion, setShopConfigKitsPermission] = useState(null);
  const [shopConfigCategoriesPermssion, setShopConfigCategoriesPermission] = useState(null);
  const [shopConfigProductsPermssion, setShopConfigProductsPermission] = useState(null);
  const [skinAccountsPermission, setSkinAccountPermission] = useState(null);
  const [skinEntriesPermission, setSkinEntriesPermission] = useState(null);
  const [eventCalendarCorpPermsission, setEventCalendarCorpPermission] = useState(null);
  const [eventCalendarAMBPermsission, setEventCalendarAMBPermission] = useState(null);
  const [incentiveTripPermission, setIncentiveTripPermission] = useState(null);
  const [coaCountriesPermission, setCoaCountriesPermission] = useState(null);
  const [coaKitsPermission, setCoaKitsPermission] = useState(null);
  const [adminSettingsCategoriesPermission,setAdminSettingsCategoriesPermission] = useState(null);
  const [adminSettingsProductsPermission, setAdminSettingsProductsPermission] = useState(null);
  const {view, edit, permissionFeched} = props;

  const getPermissions = async (email) => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `https://zidentityapidev.azurewebsites.net/Permission?Email=${email}`,
        requestOptions
      );
      const data = await response.json();

      setUserPermission(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if( props.location.state && props.location.state.email){
    getPermissions(props.location.state.email);
    }
  }, []);

  const generateDefaultValue = (area) => {
    const level =
      userPermission && userPermission.length > 0 &&
      userPermission.find((item) => {
        return item.area === area;
      }) && userPermission.find((item) => {
        return item.area === area;
      }).level
    if(level) {
    return level
    } else 
    return options[0].value
  };


  const formattedDate = props.location.state && props.location.state.createdDate &&
  props.location.state.createdDate.substr(0, props.location.state.createdDate.indexOf("Z"));

  const createdDate = formattedDate ?  moment(formattedDate).format("MM/DD/YYYY h:mm:ss a").toUpperCase(): ""

  const lastModified =  props.location.state && props.location.state.createdDate &&
  props.location.state.createdDate.substr(0, props.location.state.createdDate.indexOf("Z"));
  const dateLastModified = lastModified ?  moment(lastModified).format("MM/DD/YYYY h:mm:ss a").toUpperCase(): ""

  return (
    <Container>
      <UserTitleContainer>
        <Title>Account Details</Title>
        <Link to="/Settings/users" style={{ display: 'flex', alignSelf: 'center'}}>Back to List</Link>
      </UserTitleContainer>
      <AccountDetailsContainer>
        <div>
          <label>Email</label>
          <StyledInput readOnly={!edit} defaultValue={props.location.state &&props.location.state.email || ''} />
          <br />
          <label>Name: </label>
          <StyledInput readOnly={!edit} defaultValue={props.location.state && props.location.state.name || ''} />
          <br />
          <span
            style={{
              display: "flex",
              whiteSpace: "nowrap",
            }}
          >
            <label> Date Created:</label>
            <DateCreatedContainer>
              {createdDate}
            </DateCreatedContainer>
          </span>
        </div>
        <DateModifiedContainer>
          <label
            style={{
              display: "flex",
              whiteSpace: "nowrap",
            }}
          >
            Date Last Modified:
            {dateLastModified}
          </label>
          <label>
            <div/>
            Created by:
            { props.location.state && props.location.state.createdBy
              ? " " + props.location.state.createdBy
              : ""}
          </label>
        </DateModifiedContainer>

        <div />
      </AccountDetailsContainer>
      <hr />
      <AccountConfigContainer>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
              
            }}
          >
            Shopping Configuration
          </p>
          <div>
            <label name="countries">Countries</label>
            <StyledSelect
              value={
                shopConfigCountryPermssion || generateDefaultValue("Countries")
              }
              onChange={(e) => edit && setShopConfigCountryPermission(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Kits</label>
            <StyledSelect
              value={shopConfigKitsPermssion || generateDefaultValue("Kits")}
              onChange={(e) => edit && setShopConfigKitsPermission(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="categories">Categories</label>
            <StyledSelect
              value={
                shopConfigCategoriesPermssion ||
                generateDefaultValue("Categories")
              }
              onChange={(e) => edit && setShopConfigCategoriesPermission(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="products">Products</label>
            <StyledSelect
              value={
                shopConfigProductsPermssion || generateDefaultValue("Products")
              }
              onChange={(e) => edit && setShopConfigProductsPermission(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
        </div>
        <div style={{marginTop: '48px'}}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            COAs
          </p>
          <div>
            <label name="countries">Countries</label>
            <StyledSelect
             onChange={(e) => edit && setCoaCountriesPermission(e.target.value)}
              value={coaCountriesPermission || generateDefaultValue("Products")}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Kits</label>
            <StyledSelect
              onChange={(e) => edit && setCoaKitsPermission(e.target.value)}
              value={coaKitsPermission || generateDefaultValue("Kits")}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            Admin Settings
          </p>
          <div>
            <label name="categories">Categories</label>
            <StyledSelect
            onChange={(e) => edit && setAdminSettingsCategoriesPermission(e.target.value)}
              value={
                adminSettingsCategoriesPermission ||
                generateDefaultValue("Categories")
              }
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="products">Products</label>
            <StyledSelect
            onChange={(e) => edit && setAdminSettingsProductsPermission(e.target.value)}
              value={
                adminSettingsProductsPermission ||
                generateDefaultValue("Products")
              }
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
        </div>
      </AccountConfigContainer>
      <BottomAccountConfig>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
              marginTop: '-30px'
            }}
          >
            Skincare Challenge
          </p>
          <div>
            <label name="countries">Accounts</label>
            <StyledSelect
             onChange={(e) => edit && setSkinAccountPermission(e.target.value)}
              value={skinAccountsPermission || generateDefaultValue("Accounts")}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Entries</label>
            <StyledSelect
            onChange={(e) => edit && setSkinEntriesPermission(e.target.value)}
              value={skinEntriesPermission || generateDefaultValue("Entries")}
            >
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#707070",
                textAlign: "left",
              }}
            >
              Event Calendar
            </p>
            <div>
              <label name="countries">Corp Events</label>
              <StyledSelect
               onChange={(e) => edit && setEventCalendarCorpPermission(e.target.value)}
                value={
                  eventCalendarCorpPermsission ||
                  generateDefaultValue("Corp Events")
                }
              >
                {options.map((option) => (
                  <option key={option.id}>{option.value}</option>
                ))}
              </StyledSelect>
            </div>
            <div>
              <label name="kits">AMB Events</label>
              <StyledSelect
               onChange={(e) => edit && setEventCalendarAMBPermission(e.target.value)}
                value={
                  eventCalendarAMBPermsission ||
                  generateDefaultValue("AMB Events")
                }
              >
                {options.map((option) => (
                  <option key={option.id}>{option.value}</option>
                ))}
              </StyledSelect>
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#707070",
                textAlign: "left",
              }}
            >
              Incentive Trip
            </p>
            <div>
              <label name="countries">Incentive Trip</label>
              <StyledSelect
              onChange={(e) => edit && setIncentiveTripPermission(e.target.value)}
              value={
                incentiveTripPermission ||
                generateDefaultValue("Incentive Trip")
              }
              >
                {options.map((option) => (
                  <option
                 
                    key={option.id}
                  >
                    {option.value}
                  </option>
                ))}
              </StyledSelect>
            </div>
          </div>
        </div>
      </BottomAccountConfig>
      <div style={{ display: "flex" }}>
        <StyledButton>Save</StyledButton>
      </div>
    </Container>
  );
};

const StyledButton = styled(Button)`
  background-color: #0f4b8f;

  color: white;

  height: 40px;

  font-weight: bold;

  width: 130px;
  text-align: center;
  margin-top: 75px;
  margin-bottom: 45px;
`;

const BottomAccountConfig = styled.div`
  display: flex;
`;
const Container = styled.div`
  label {
    width: 100px;
    text-align: left;
    margin-left: 12px;
  }
  max-width: 1600px;
  margin-left: 9%;
  margin-right: 9%;
  @media screen and (max-width: 1200px) {
    margin-left: 3%;
    margin-right: 3%;
  }
`;

const AccountConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px;
  max-width: 1225px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.p`
  color: #707070;
  font-size: 36px;
  text-align: left;
`;

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  label {
    color: #707070;
    }
  p {
    color: #707070;
  }
`;
const StyledInput = styled.input`
  border: 2px solid #0f4b8f;
  width: 271px;
  @media screen and (min-width: 1400px) {
    margin-left: 65px;
  }
`;

const StyledSelect = styled.select`
  border: 2px solid #0f4b8f;
  width: 271px;
  @media screen and (min-width: 1400px) {
    margin-left: 65px;
  }
`;

const DateCreatedContainer = styled.div`
@media screen and (min-width: 1400px) {
  margin-left: 65px;
}
`
const DateModifiedContainer = styled.div`
padding-right: min(150px, 70%);
`
export default connect(getComponentData)(UserAuthorizationStatusAddEdit);
