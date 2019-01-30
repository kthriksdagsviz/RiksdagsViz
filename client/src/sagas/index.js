import {fork, all} from 'redux-saga/effects'
import { watchVoteringSaga } from './votering_saga'

export default function* mySaga() {
  yield all([
  	fork(watchVoteringSaga)

  ])
}