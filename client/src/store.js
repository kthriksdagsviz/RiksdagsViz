import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import mySaga from "./sagas";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter } from 'connected-react-router'

import voteringar from "./reducers/voteringar_reducer"
import ledamoter from "./reducers/ledamoter_reducer"
import nyheter from "./reducers/nyheter_reducer"
import reducers from './reducers';
import { combineReducers } from "redux";


const persistConfig = {
	key: 'root',
	storage,
  }
  


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory()

const rootReducer = combineReducers({
	router: connectRouter(history),
	voteringar,
	ledamoter,
	nyheter
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer);


const middlewares = [
	routerMiddleware(history),
    sagaMiddleware,
]




export default  () => {

	const store = createStore(
		pReducer,{},
		composeEnhancers(
		applyMiddleware(
			...middlewares
		)
	),
	)
	 const persistor = persistStore(store);
	 sagaMiddleware.run(mySaga);

	return { store, persistor }
}
 