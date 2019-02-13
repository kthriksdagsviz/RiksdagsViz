import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as types from '../constants/ActionTypes'

import { ledamoter_api } from '../services'

function* getLedamoterByParams(data) {
  const { payload } = data;
  try {
    const data = yield call(ledamoter_api.getLedamoterByParams, payload.params)
    //console.log(data)
    yield put(actions.receivedLedamoterByParams(data));

  } catch (e) {
    console.log(e);
  }
}

export function* watchLedamoterSaga() {
  yield takeLatest(types.REQUEST_LEDAMOTER, getLedamoterByParams);

}
