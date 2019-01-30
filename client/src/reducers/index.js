import { combineReducers } from "redux";
import voteringar from "./voteringar_reducer"

import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  voteringar,
});