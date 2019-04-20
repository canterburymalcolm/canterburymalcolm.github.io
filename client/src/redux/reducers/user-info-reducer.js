import { SET_USER, SET_ORDER} from '../action-types';

const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            //Update the current user with this user's username and password,
            //or their profile id if they're a returning user
            const { user } = action.payload;
            return {
                ...state,
                user: user 
            }
        case SET_ORDER:
            const { order } = action.payload;
            return {
                ...state,
                order: order
            }
        default:
            return state;
    }
}

export default userInfoReducer;