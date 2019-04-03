import { Parent } from '../../constants';
import { ADD_PARENT } from '../action-types';

export default function parentReducer(state = new Parent(), action) {
    switch (action.type) {
        case ADD_PARENT: {
            return action.payload.parent;
        }
        default: {
            return state;
        }
    }
}