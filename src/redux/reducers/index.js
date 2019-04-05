import { combineReducers } from 'redux';
import methodReducer from './method-reducer';
import parentReducer from './parent-reducer';
import pageReducer from './page-reducer';
import usersReducer from './users-reducer';

export default combineReducers({
    pages: pageReducer,
    users: usersReducer,
    method: methodReducer,
    parent: parentReducer
});