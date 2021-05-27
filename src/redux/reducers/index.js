import { combineReducers } from 'redux';
import { appReducer } from '../reducers/app/appReducer';
import { productConfigReducer } from '../reducers/ProductsConfig/productConfigReducer';


export default combineReducers({
        app:appReducer,
        products: productConfigReducer
    })
