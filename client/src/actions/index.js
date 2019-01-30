import * as types from '../constants/ActionTypes'

export const requestVoteringarById = id => ({
    type:types.REQUEST_VOTERING_BY_ID, 
    payload:{
        id
    }
})


export const receivedVoteringarById = data => ({type:types.RECEIVED_VOTERING_BY_ID, data})
