import { combineReducers } from 'redux';
import pageReducer from './page-reducer';
import userReducer from './user-reducer';
import parentsReducer from './parents-reducer';

export default combineReducers({
    pages: pageReducer,
    user: userReducer,
    parents: parentsReducer
});