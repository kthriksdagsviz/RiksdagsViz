
import Ledamot from '../containers/Ledamot';
import Partier from '../containers/Partier';
// import Parti from '../containers/Parti';

import React from 'react'
import { Route, Switch } from 'react-router'
import AppContainer from '../containers/AppContainer'
import About from '../containers/About'
import Navbar from '../components/Navbar/Navbar';
import NoMatch from '../components/NoMatch'
import Ledamoter from '../containers/Ledamoter'
import PartiVotes from '../containers/PartiVotes';
import PartiPage from '../containers/Parti'
import VoteringPage from '../containers/voteringpage';
import PartiInfo from '../containers/PartiInfo';

const routes = (
  <div>
    <Navbar />
    <div  className="App_container">
      <Switch>   
          <Route exact path="/" component={AppContainer} />
          <Route exact path="/ledamoter" render={() =><Ledamoter />} />
          <Route exact path="/ledamoter/:id" render={(props) => <Ledamot {...props} />} />
          <Route exact path="/partier" render={() => <PartiVotes />} />
          <Route exact path="/parties" render={() => <Partier />} />
          <Route exact path="/parties/:parti" render={(props) => <PartiPage {...props} />} />
          <Route exact path="/voteringar/:id" render={(props) => <VoteringPage {...props}  />} /> 
          <Route exact path="/about" render={() => <About />} />
          <Route component={NoMatch} />
      </Switch>
    </div>
  </div>
)


export default routes;