import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore, { history } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import PT from 'prop-types';



React.PropTypes = PT;

console.disableYellowBox = true;

const { store, persistor } =configureStore()
//  const { store } =configureStore()

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App history={history} />
          </PersistGate>
        </Provider>,
      document.getElementById('root')
    )
  }

render()

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./App', () => {
      render()
    })
}

serviceWorker.unregister();
