import { call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as types from '../constants/ActionTypes'

import { votering_api } from '../services'

function* getVoteringById(data) {
  const { payload } = data;
 
  try {
    const data = yield call(votering_api.getVoteringById, payload.id)
    yield put(actions.receivedVoteringarById(data));

  } catch (e) {
    console.log(e);
  }
}

function* getVoteringByYear(data) {
  const { payload } = data;
  try {
    const data = yield call(votering_api.getVoteringByYear, payload.year, payload.parties)
    let dataToSend = {
      data,
      year: payload.year
    }
   
    yield put(actions.receivedVoteringarByYear(dataToSend));

  } catch (e) {
    console.log(e);
  }
}

export function* watchVoteringSaga() {
  
  
  yield takeLatest(types.REQUEST_VOTERING_BY_YEAR, getVoteringByYear);
}