import {
    CHANGE_METHOD,
    ADD_PARENT,
    NEXT_PAGE,
    PREV_PAGE,
    LOG_IN,
    START_USER,
    ADD_USER,
    SET_USER
} from './action-types';

export function changeMethod(method) {
    return {
        type: CHANGE_METHOD,
        payload: { method }
    }
};

export function addParent(parent) {
    return {
        type: ADD_PARENT,
        payload: { parent }
    }
}

//Transition between pages
export const nextPage = () => ({ type: NEXT_PAGE });
export const prevPage = () => ({ type: PREV_PAGE });
export const logIn = () => ({ type: LOG_IN });

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