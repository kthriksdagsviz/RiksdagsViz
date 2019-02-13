import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as types from '../constants/ActionTypes'
import { nyheter_api } from '../services'


function* getNyheterByParams(data) {
  const { payload } = data;
  try {
    const data = yield call(nyheter_api.getNyheterByParams, payload.params)
    yield put(actions.receivedNyheterByParams(data));

  } catch (e) {
    console.log(e);
  }
}



export function* watchNyheterSaga() {
  yield takeLatest(types.REQUEST_NEWS, getNyheterByParams);
  
}
