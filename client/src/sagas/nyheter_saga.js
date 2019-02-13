import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as types from '../constants/ActionTypes'
import { nyheter_api } from '../services'


function* getNyheterByParams(data) {
  const { payload } = data;
  try {
    const res = yield call(nyheter_api.getNyheterByParams, payload.params)
    if(res.totalResults < 1){
      payload.params.q = 'Riksdagen';
      const resBackup = yield call(nyheter_api.getNyheterByParams, payload.params)
      yield put(actions.receivedNyheterByParams(resBackup));
    }
    else{
      yield put(actions.receivedNyheterByParams(res));
    }

    
    

  } catch (e) {
    console.log(e);
  }
}



export function* watchNyheterSaga() {
  yield takeLatest(types.REQUEST_NEWS, getNyheterByParams);
  
}
