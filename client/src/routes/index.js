import React from 'react'
import { Route, Switch } from 'react-router'
import AppContainer from '../containers/AppContainer'
import About from '../containers/About'
import Navbar from '../components/Navbar'
import NoMatch from '../components/NoMatch'
import Ledamoter from '../containers/Ledamoter';

const routes = (
  <div>
    <Navbar />
   
    <div style={{marginLeft:'100px'}}>
    <Switch>   
      <Route exact path="/" component={AppContainer} />
      <Route exact path="/ledamoter" render={() =><Ledamoter />} />
      <Route exact path="/about" render={() => <About />} />
      <Route component={NoMatch} />
    </Switch>
    </div>
  </div>
)

export default routes;