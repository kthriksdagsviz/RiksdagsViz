import * as types from '../constants/ActionTypes'

export const requestStartStations = string => ({type:types.REQUEST_START_STATIONS, string})
export const receivedStartStations = data =>({type:types.RECEIVED_START_STATIONS, data})
