import { combineReducers } from "redux";
import stations from "./station_reducer"

import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  stations,
});