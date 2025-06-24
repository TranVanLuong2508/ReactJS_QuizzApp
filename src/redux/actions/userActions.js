import { ACTIONS_TYPE } from "./actionType"

const userActions = {
    fetchUserLoginSuccess: (userData) => {
        return {
            type: ACTIONS_TYPE.USER_LOGIN_SUCCESS,
            payload: userData
        }
    },
    UserLogOut: () => {
        return {
            type: ACTIONS_TYPE.USER_LOGOUT_SUCCESS,
        }
    }
}

export default userActions