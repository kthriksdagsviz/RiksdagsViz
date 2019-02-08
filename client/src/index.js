import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store, { history } from './store'



const render = () => {
    ReactDOM.render(
        <Provider store={store}>
          <App history={history} />
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
