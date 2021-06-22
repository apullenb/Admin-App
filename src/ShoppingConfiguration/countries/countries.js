/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Country from './country';
import AddCountry from './addCountry';
import ZilisLoader from '../../GlobalComponents/ZilisLoader';
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import '../../App.scss';

import { handleFetchCountriesAsync } from '../../redux/actions/Configuration/countryConfig/countryActions';


const Countries = props => {
  const dispatch = useDispatch();
  const { countries, fetching } = useSelector(state => state.countries);
  let { path, url } = useRouteMatch();
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    dispatch(handleFetchCountriesAsync());
  }, [])


  useEffect(() => {
    setCountriesData(countries)
  }, [countries])

  const filterItems = (filter) => {
    const filterdItems = countries.filter(item => item.name.includes(filter.toUpperCase()));
    setCountriesData(filterdItems);
  }

  return (
    <CountryBodyWrapper>
      <CountriesWrapper>
        <SearchWrapper>
          <h2>Countries Page</h2>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text><i className="fas fa-binoculars"></i></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text' name='search' onChange={(e) => { filterItems(e.target.value) }} placeholder="Search..." />
          </InputGroup>
        </SearchWrapper>
        <AddCountryWrapper>
          <AddCountryButtonWrapper>
            <Link to={`${url}/addCountry`}>New Country</Link>
          </AddCountryButtonWrapper>
        </AddCountryWrapper>

        <div>
          <div>
            {fetching ? <ZilisLoader width={50} height={50} /> : <b>Countries List</b>}
          </div>
          <ListWrapper>
            {countriesData.map((country) => {
              return (
                <li key={country.id}>
                  <Link to={`${url}/${country.id}`}>{country.name}</Link>
                </li>
              );
            })}
          </ListWrapper>
        </div>
      </CountriesWrapper>


      <CountryWapper>

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

const CountryBodyWrapper = Styled.div`
    width:1400px;
    display:flex;
    flex-direction: row;
    justify-content:left;
    margin: 0 auto;
    text-align:left;
 `;

const CountriesWrapper = Styled.div`
    display:flex;
    flex-direction:column;
    overflow: auto;
    min-width:300px;
    height: calc(100% - 146px);
`;

const ListWrapper = Styled.div`
    list-style:none;
    padding:5%;
`;

const CountryWapper = Styled.div`
    width:100%;
    height:100vh;
    margin: 0 10px;
    overflow:auto;
    padding: 2%;
`;

const AddCountryWrapper = Styled.div`
  display:flex;
  justify-content:left;
  margin: 20px 0;
`;

const AddCountryButtonWrapper = Styled.div`
  a {
    width:100%;
    background-color: rgba(52,58,64,0.8);
    border:2px solid rgba(0,0,0,0.5);
    border-radius:8px;
    color:#fff;
    padding: 5px 15px;

    &:hover {
      text-decoration: none;
      background-color: rgba(52,58,64,0.5);
    }
  }
`;

const SearchWrapper = Styled.div`
  display: flex;
  justify-content:left;
  flex-direction:column;
  width:282px;
`;