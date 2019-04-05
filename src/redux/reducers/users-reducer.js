import { START_USER, ADD_USER } from '../action-types';

const initialState = {
    current: {},
    profiles: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_USER:
            //Update the current user with this user's username and password,
            //or their profile id if they're a returning user
            return {
                ...state,
                current: action.payload.user
            };
        case ADD_USER: {
            const { user } = action.payload;
            //If this user is already logged in then just update their info
            if (typeof state.current.username === 'undefined') {
                const profile = state.profiles.splice(state.current.id, 1)[0];
                return {
                    ...state,
                    profiles: [
                        ...state.profiles,
                        { ...profile, ...user }
                    ]
                };
            }
            //Add this user to the list of profiles and
            //set the current user to the index they were added at
            const id = state.profiles.length;
            return {
                ...state,
                current: { id: id },
                profiles: [
                    ...state.profiles, {
                        id: id,
                        ...state.current,
                        ...user
                    }
                ]
            };
        }
        default:
            return state;
    }
}

export default usersReducer;