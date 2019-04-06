import { UPDATE_PARENT, ADD_MOM, ADD_DAD } from '../action-types';

const initialState = {
    current: {},
    mom: {},
    dad: {}
};

const parentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PARENT: {
            const { parent } = action.payload
            return {
                ...state,
                current: {...state.current, ...parent}
            };
        }
        case ADD_MOM: {
            const { parent } = action.payload
            return {
                ...state,
                mom: {...state.mom, ...parent}
            };
        }
        case ADD_DAD: {
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