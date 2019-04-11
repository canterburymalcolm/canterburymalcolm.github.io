import { NEXT_PAGE, PREV_PAGE, LOG_IN, CHANGE_METHOD } from '../action-types';
import { PAGES, pageMap } from '../../constants';

const initialState = [PAGES.LANDING];

function pageReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_PAGE:
            return [...state, pageMap.get(state[state.length - 1])];
        case PREV_PAGE:
            return state.slice(0, state.length - 1);
        case LOG_IN:
            return [...state, PAGES.LOG_IN];
        case CHANGE_METHOD: {
            //Replaces the current page with the given page
            const setCurrentPage = (page) => (
                [...state.slice(0, state.length - 1), page]
            );
            switch (state[state.length - 1]) {
                case PAGES.ADD_MOM:
                    return setCurrentPage(PAGES.DONOR_MOM);
                case PAGES.ADD_DAD:
                    return setCurrentPage(PAGES.DONOR_DAD);
                case PAGES.DONOR_MOM:
                    return setCurrentPage(PAGES.ADD_MOM);
                case PAGES.DONOR_DAD:
                    return setCurrentPage(PAGES.ADD_DAD);
                default: return state;
            }
        }
        default:
            return state;
    }
}

export default pageReducer;