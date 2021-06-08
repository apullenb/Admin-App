import { combineReducers } from 'redux';
import { appReducer } from '../reducers/app/appReducer';
import { productConfigReducer } from '../reducers/ProductsConfig/productConfigReducer';
import { countriesConfigReducer } from '../reducers/CountryConfig/countryConfigReducer';


export default combineReducers({
        app:appReducer,
        products:productConfigReducer,
        countries:countriesConfigReducer
    })
