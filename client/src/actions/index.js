import * as types from '../constants/ActionTypes'


/*
Votering actions
*/
export const requestVoteringarById = id => ({type:types.REQUEST_VOTERING_BY_ID, payload:{id}})
export const receivedVoteringarById = data => ({type:types.RECEIVED_VOTERING_BY_ID, data})

export const requestVoteringarByYear = (year, parties) => ({type:types.REQUEST_VOTERING_BY_YEAR, payload:{year, parties: parties}})
export const receivedVoteringarByYear = data => ({type:types.RECEIVED_VOTERING_BY_YEAR, data})


/*
Ledamoter actions
*/
export const requestLedamoterByParams = (params) => ({type: types.REQUEST_LEDAMOTER,payload: {params}})
export const receivedLedamoterByParams = data => ({type:types.RECEIVED_LEDAMOTER, data})

export const toggleVoteringFetched = () => ({type:types.TOGGLE_VOTERING_FETCHED})

export const setSelectedLedamot = (data) => ({type: types.SET_LEDAMOT, data})

export const setLedamotFetched = () => ({type: types.SET_LEDAMOT_FETCHED})


/*
Nyheter actions
*/
export const requestNyheterByParams = (params) => ({type: types.REQUEST_NEWS,payload: {params}})
export const receivedNyheterByParams = data => ({type:types.RECEIVED_NEWS, data})

