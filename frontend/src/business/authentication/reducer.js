import { ActionTypes } from '../../const';
import { createReducer } from '../../utils/redux';

export const STATE_KEY = 'authentication';

const INITIAL_STATE = {
    isLogin: false,
    account: null,
    identity: null
};

function setAuth(state = INITIAL_STATE, action) {
    const { type, data } = action

    switch (type) {
        case ActionTypes.SET_AUTH: {
            const { id } = data
            return {
                identity: id
            }
        }
        default:
            return state;
    }
}

export const reducer = createReducer(INITIAL_STATE, {
    [ActionTypes.SET_AUTH]: setAuth,
});