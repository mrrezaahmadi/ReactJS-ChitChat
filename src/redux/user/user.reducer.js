import * as actionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        default:
            return state
    }
}

export default userReducer