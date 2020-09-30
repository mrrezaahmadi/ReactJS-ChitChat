import actionTypes from './colors.types'

export const setColors = (primaryColor, secondaryColor) => ({
    type: actionTypes.SET_COLORS,
    payload: {
        primaryColor,
        secondaryColor
    }
})