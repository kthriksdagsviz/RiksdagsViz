import { combineReducers } from "redux";
import voteringar from "./voteringar_reducer"
import ledamoter from "./ledamoter_reducer"
import nyheter from "./nyheter_reducer"

import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  voteringar,
  ledamoter,
  nyheter
});