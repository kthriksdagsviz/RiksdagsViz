import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import reducer from "./reducers";
import mySaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
	routerMiddleware(history),
    sagaMiddleware,
]

const store = createStore(
	reducer(history),
	composeEnhancers(
	applyMiddleware(
		...middlewares
	)
	),
)
  

// then run the saga
sagaMiddleware.run(mySaga);
export default store;