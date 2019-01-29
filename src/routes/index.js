import React from 'react'
import { Route, Switch } from 'react-router'
import AppContainer from '../containers/AppContainer'
import Hello from '../containers/Hello'
import Navbar from '../components/Navbar'
import NoMatch from '../components/NoMatch'

const routes = (
  <div>
    <Navbar />
   
    <div style={{marginLeft:'50px'}}>
    <Switch>   
      <Route exact path="/" component={AppContainer} />
      <Route exact path="/hello" render={() => <Hello />} />
      <Route component={NoMatch} />
    </Switch>
    </div>
  </div>
)

export default routes;