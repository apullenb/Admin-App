import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import Axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Country from './country';
import AddCountry from './addCountry';
import PageWrapper from '../../GlobalComponents/PageWrapper';
import ZilisLoader from '../../GlobalComponents/ZilisLoader';
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import config from '../../config/env-urls'
import '../../App.scss';

import { handleFetchCountriesAsync } from '../../redux/actions/Configuration/countryConfig/countryActions';

const CountryBodyWrapper = Styled.div`
    width:90%;
    display:flex;
    flex-direction:row ;
    justify-content:center;
    margin: 0 auto;
    padding: 2%;
    text-align:center;
 `;

const CountriesWrapper = Styled.div`
    display:flex;
    flex-direction:column;
    overflow: auto;
    min-width:300px;
    max-width:300px;
    height:500px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.3);
`;

const ListWrapper = Styled.div`
    list-style:none;
    padding:5%;
`;

const CountryWapper = Styled.div`
    background-color: #F0F1F2;
    width:100%;
    height:100vh;
    margin: 0 10px;
    overflow:auto;
    padding: 2%;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.5);
`;

const AddCountryWrapper = Styled.div`
  width:80%;
  margin-left:10%;
  margin-bottom:5%;
  display:flex;
  justify-content:flex-start;
`;

const AdCountryButtonWrapper = Styled.span`
  width:100%;
  background-color: rgba(52,58,64,0.8);
  border:2px solid rgba(0,0,0,0.5);
  border-radius:8px;
  padding: 1%;
  color:#fff;
  
`;



const Countries = props => {
  const dispatch = useDispatch();
  const { countries, fetching } = useSelector(state => state.countries);
  let { path, url } = useRouteMatch();
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    dispatch(handleFetchCountriesAsync());
    console.log(countries);
  }, [])


  useEffect(() => {
    setCountriesData(countries)
    console.log(countries);
  }, [countries])

  const filterItems = (filter) => {

    const filterdItems = countries.filter(item => {
      if (item.name.includes(filter.toUpperCase())) {
        return item;
      }
    });

    setCountriesData(filterdItems);
  }

  return (

    <CountryBodyWrapper>
      <CountriesWrapper>
        <h2>Countries Page</h2>

        <InputGroup className="mb-2 mr-sm-2">
          <InputGroup.Prepend>
            <InputGroup.Text><i className="fas fa-binoculars"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type='text' name='search' onChange={(e) => { filterItems(e.target.value) }} placeholder="Search..." />
        </InputGroup>

        <div>
          {fetching ? <ZilisLoader width={50} height={50} /> : <b>Countries List</b>}
        </div>
        <ListWrapper>
          {countries.map((country) => {
            return (
              <li key={country.id}>
                <Link to={`${url}/${country.id}`}>{country.name}</Link>
              </li>
            );
          })}
        </ListWrapper>
      </CountriesWrapper>


      <CountryWapper>
        <AddCountryWrapper>
          <AdCountryButtonWrapper>
            <label className='add-button-label form-labels'>Create A New Country</label><Link to={`${url}/addCountry`}><Button variant="success" style={{ fontSize: 30, width: '50px' }}>&#43;</Button></Link>
          </AdCountryButtonWrapper>
        </AddCountryWrapper>

        <Switch>
          <Route exact path={path}></Route>
          <Route path={`${path}/addCountry`}>
            <AddCountry />
          </Route>

          <Route path={`${path}/:id`}>
            <Country />
          </Route>
        </Switch>

      </CountryWapper>
    </CountryBodyWrapper>

  )

}

export default Countries;

