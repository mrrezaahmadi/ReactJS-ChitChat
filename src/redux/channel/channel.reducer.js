import * as actionTypes from './channel.types'

const INITIAL_STATE = {
    currentChannel: null
}

const channelReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        default:
            return state
    }
}

export default channelReducer