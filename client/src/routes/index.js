import React from 'react'
import { Route, Switch } from 'react-router'
import AppContainer from '../containers/AppContainer'
import Hello from '../containers/Hello'
import Navbar from '../components/Navbar'
import NoMatch from '../components/NoMatch'
import Ledamoter from '../containers/Ledamoter';

const routes = (
  <div>
    <Navbar />
   
    <div style={{marginLeft:'100px'}}>
    <Switch>   
      <Route exact path="/" component={AppContainer} />
      <Route exact path="/hello" render={() => <Hello />} />
      <Route exact path="/ledamoter" render={() =><Ledamoter />} />
      <Route component={NoMatch} />
    </Switch>
    </div>
  </div>
)

export default routes;