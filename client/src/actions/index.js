import * as types from '../constants/ActionTypes'


/*
Votering actions
*/
export const requestVoteringarById = id => ({type:types.REQUEST_VOTERING_BY_ID, payload:{id}})
export const receivedVoteringarById = data => ({type:types.RECEIVED_VOTERING_BY_ID, data})



/*
Ledamoter actions
*/
export const requestLedamoterByParams = (params) => ({type: types.REQUEST_LEDAMOTER,payload: {params}})
export const receivedLedamoterByParams = data => ({type:types.RECEIVED_LEDAMOTER, data})




