import { CHANGE_METHOD, ADD_PARENT, NEXT_PAGE, PREV_PAGE, LOG_IN} from './action-types';

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

export const nextPage = () => ({type: NEXT_PAGE});
export const prevPage = () => ({type: PREV_PAGE});
export const logIn = () => ({type: LOG_IN});
