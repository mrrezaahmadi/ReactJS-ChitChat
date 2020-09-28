import * as actionTypes from './user.types'

export const setUser = user => ({
    type: actionTypes.SET_USER,
    payload: {
        currentUser: user
    }
})

export const clearUser = () => ({
    type: actionTypes.CLEAR_USER
})