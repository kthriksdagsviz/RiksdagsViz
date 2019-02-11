import {fork, all} from 'redux-saga/effects'
import { watchVoteringSaga } from './votering_saga'
import { watchLedamoterSaga } from './ledamoter_saga'

export default function* mySaga() {
  yield all([
  	fork(watchVoteringSaga),
    fork(watchLedamoterSaga)
  ])
}