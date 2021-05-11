import manageFoodReducer from './manageFoodReducer';
import manageUserReducer from './manageUserReducer';
import {combineReducers} from 'redux';
const allReducers = {
  manageFoodReducer,
  manageUserReducer,
};

const appReducer = combineReducers(allReducers);

export default appReducer;
