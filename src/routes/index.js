import React from 'react'
import { Route, Switch } from 'react-router'
import AppContainer from '../containers/AppContainer'
import Hello from '../containers/Hello'
import { Link } from 'react-router-dom'

const routes = (
  <div>
    {/* <NavBar /> */}
    <div style={{height:'100%', backgroundColor:'gray', position:'fixed', width:'50px', top:0}}> 
        
        <Link to="/"> Home </Link>
        <Link to="/hello"> Hello </Link>
    </div>
    <Switch>
      <div style={{marginLeft:'50px'}}>
      <Route exact path="/" component={AppContainer} />
      <Route exact path="/hello" component={Hello} />
      </div>
    </Switch>
  </div>
)

export default routes