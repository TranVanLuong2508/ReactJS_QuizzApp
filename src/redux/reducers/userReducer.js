import { ACTIONS_TYPE } from "../actions/actionType"

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        email: ''
    },
    isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case ACTIONS_TYPE.USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: actions.payload.access_token,
                    refresh_token: actions.payload.refresh_token,
                    username: actions.payload.username,
                    image: actions.payload.image,
                    role: actions.payload.role,
                    email: actions.payload.email
                },
                isAuthenticated: true
            }
        case ACTIONS_TYPE.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    email: ''
                },
                isAuthenticated: false
            }
        default:
            return state
    }
}
export default userReducer