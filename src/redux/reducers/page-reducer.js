import { NEXT_PAGE, PREV_PAGE, LOG_IN } from '../action-types';
import { PAGES, pageMap } from '../../constants';

const initialState = [PAGES.LANDING];

function pageReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return [...state, PAGES.LOG_IN];
        case NEXT_PAGE:
            return [...state, pageMap.get(state[state.length - 1])];
        case PREV_PAGE:
            return state.slice(0, state.length - 1);
        default:
            return state;
    }
}

export default pageReducer;