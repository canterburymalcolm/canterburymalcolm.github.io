import { combineReducers } from 'redux';
import methodReducer from './method-reducer';
import parentReducer from './parent-reducer';
import pageReducer from './page-reducer';

export default combineReducers({
    pages: pageReducer,
    method: methodReducer,
    parent: parentReducer
});