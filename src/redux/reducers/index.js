import { combineReducers } from 'redux';
import { appReducer } from '../reducers/app/appReducer';


export default combineReducers({
        app:appReducer
    })
