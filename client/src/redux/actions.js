import {
    NEXT_PAGE,
    PREV_PAGE,
    LOG_IN,
    CHANGE_METHOD,
    SET_USER,
    SET_ORDER,
    UPDATE_MOM,
    UPDATE_DAD
} from './action-types';

//Transition between pages
export const nextPage = () => ({ type: NEXT_PAGE });
export const prevPage = () => ({ type: PREV_PAGE });
export const logIn = () => ({ type: LOG_IN });
export const changeMethod = () => ({ type: CHANGE_METHOD});

//Set the current user
export const setUser = (user) => ({
    type: SET_USER,
    payload: { user }
});

export const setOrder = (order) => ({
    type: SET_ORDER,
    payload: { order }
});

//Update current parents
export const updateMom = (parent) => ({
    type: UPDATE_MOM,
    payload: { parent }
});
export const updateDad = (parent) => ({
    type: UPDATE_DAD,
    payload: { parent }
});
