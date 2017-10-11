import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import popupsReducer from './popups_reducer';

export default combineReducers({
  appReducer,
  popupsReducer
})
