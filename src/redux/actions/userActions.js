import { ACTIONS_TYPE } from "./actionType"

const userActions = {
    fetchUserLoginSuccess: (userData) => {
        return {
            type: ACTIONS_TYPE.USER_LOGIN_SUCCESS,
            payload: userData
        }
    }
}

export default userActions