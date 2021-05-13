import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import Axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Country from './country';
import AddCountry from './addCounrty';
import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";
  import config from '../../config/config'

const CountryBodyWrapper = Styled.div`
    display:flex;
    flex-direction:row ;
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
let { path, url } = useRouteMatch();
const [countries, setCountries] = useState([]);

const getAsyncCountries = () => { Axios.get(`${config.CHALLANGE_API_URL}/api/countries`).then(res => {
    setCountries(res.data);
}).catch(error => {
    console.log(error);
});
}

useEffect(()=>{
    getAsyncCountries();
    console.log(countries);
},[])


  const filterItems = (filter) => {

    const filterdItems = countries.filter(item => { 
      if (item.name.includes(filter.toUpperCase())){
         return item;
        }
    });

   

    setCountries(filterdItems);
}

    return (

<CountryBodyWrapper>
<CountriesWrapper>
  <h2>Countries Page</h2>

  <InputGroup className="mb-2 mr-sm-2">
  <InputGroup.Prepend>
  <InputGroup.Text><i class="fas fa-binoculars"></i></InputGroup.Text>
  </InputGroup.Prepend>
  <FormControl type='text' name='search' onChange={(e)=>{filterItems(e.target.value)}} placeholder="Search..."  />
  </InputGroup>

  <Button
    variant="primary"
    onClick={() => {
      getAsyncCountries();
    }}
  >
    {props.isLoading? 'Loading...'  :  'Get all Products'}
  </Button>
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
    <label className='add-button-label form-labels'>Create A New Country</label><Link to={`${url}/addCountry`}><Button variant="success" style={{fontSize:30, width:'50px'}}>&#43;</Button></Link>
    </AdCountryButtonWrapper>
  </AddCountryWrapper>

  <Switch>
    <Route exact path={path}></Route>
    <Route  path={`${path}/addCountry`}>
        <AddCountry
        getAsyncCountries = {getAsyncCountries}
       /> 
    </Route>

    <Route  path={`${path}/:id`}>
      <Country
        countries={countries}
        getAsyncCountries={getAsyncCountries}
      />
    </Route>
  </Switch>
</CountryWapper>
</CountryBodyWrapper>



    )

}

export default Countries;

