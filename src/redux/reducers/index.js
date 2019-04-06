import { combineReducers } from 'redux';
import pageReducer from './page-reducer';
import usersReducer from './users-reducer';
import parentsReducer from './parents-reducer';

export default combineReducers({
    pages: pageReducer,
    users: usersReducer,
    parents: parentsReducer
});