import actionTypes from './user.types'

export const setUser = user => ({
    type: actionTypes.SET_USER,
    payload: {
        currentUser: user
    }
})

export const clearUser = () => ({
    type: actionTypes.CLEAR_USER
})

export const setUserPosts = (userPosts) => ({
    type: actionTypes.SET_USER_POSTS,
    payload: {
        userPosts
    }
})