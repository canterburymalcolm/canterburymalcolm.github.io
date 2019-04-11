import {
    NEXT_PAGE,
    PREV_PAGE,
    LOG_IN,
    CHANGE_METHOD,
    START_USER,
    ADD_USER,
    SET_USER,
    UPDATE_PARENT,
    ADD_MOM,
    ADD_DAD
} from './action-types';

//Transition between pages
export const nextPage = () => ({ type: NEXT_PAGE });
export const prevPage = () => ({ type: PREV_PAGE });
export const logIn = () => ({ type: LOG_IN });
export const changeMethod = () => ({ type: CHANGE_METHOD});

//Add and update users
export const startUser = (user) => ({
    type: START_USER,
    payload: { user }
});
export const addUser = (user) => ({
    type: ADD_USER,
    payload: { user }
});
export const setUser = (user) => ({
    type: SET_USER,
    payload: { user }
});

//Add or update parents
export const updateParent = (parent) => ({
    type: UPDATE_PARENT,
    payload: { parent }
});
export const addMom = (parent) => ({
    type: ADD_MOM,
    payload: { parent }
});
export const addDad = (parent) => ({
    type: ADD_DAD,
    payload: { parent }
});
