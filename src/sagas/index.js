import {fork, all} from 'redux-saga/effects'
import { watchStationSaga } from './station_saga'

export default function* mySaga() {
  yield all([
  	fork(watchStationSaga)

  ])
}