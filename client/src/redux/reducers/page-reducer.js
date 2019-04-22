import { NEXT_PAGE, PREV_PAGE, LOG_IN, CHANGE_METHOD, EDIT_PARENT } from '../action-types';
import { PAGES, pageMap } from '../../constants';

const initialState = [PAGES.LANDING];

function pageReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_PAGE:
            const page = pageMap.get(state[state.length - 1]);
            console.log('next page: ' + page);
            return [...state, page];
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
        case EDIT_PARENT:
            const { parent } = action.payload
            return state.slice(0, state.length - parent);
        default:
            console.log('default: ' + action.type);
            return state;
    }
}

export default pageReducer;