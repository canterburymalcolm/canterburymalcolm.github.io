import { SET_USER } from '../action-types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            //Update the current user with this user's username and password,
            //or their profile id if they're a returning user
            return action.payload.user;
        default:
            return state;
    }
}

export default userReducer;