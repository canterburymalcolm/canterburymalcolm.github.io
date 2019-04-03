import { CHANGE_METHOD } from '../action-types';
import { CREATION_METHODS } from '../../constants';

const initialState = CREATION_METHODS.NONE;

function methodReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_METHOD: {
            return action.payload.method;
        }
        default: {
            return state;
        }
    }
};

export default methodReducer;