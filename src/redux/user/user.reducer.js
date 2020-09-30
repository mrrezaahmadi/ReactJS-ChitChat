import actionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    isLoading: true,
    userPosts: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.userPosts
            }
        default:
            return state
    }
}

export default userReducer