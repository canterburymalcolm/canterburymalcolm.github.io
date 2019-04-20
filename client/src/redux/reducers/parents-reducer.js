import { UPDATE_MOM, UPDATE_DAD } from '../action-types';

const initialState = {
    mom: {},
    dad: {}
};

const parentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_MOM: {
            const { parent } = action.payload
            return {
                ...state,
                mom: {...state.mom, ...parent}
            };
        }
        case UPDATE_DAD: {
            const { parent } = action.payload
            return {
                ...state,
                dad: {...state.dad, ...parent}
            };
        }
        default:
            return state;
    }
}

export default parentsReducer;