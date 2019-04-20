import { combineReducers } from 'redux';
import pageReducer from './page-reducer';
import userInfoReducer from './user-info-reducer';
import parentsReducer from './parents-reducer';

export default combineReducers({
    pages: pageReducer,
    userInfo: userInfoReducer,
    parents: parentsReducer
});