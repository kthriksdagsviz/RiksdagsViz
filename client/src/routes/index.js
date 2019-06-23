import Ledamot from "../containers/Ledamot";
import Partier from "../containers/Partier";
// import Parti from '../containers/Parti';

import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AppContainer from "../containers/AppContainer";
import About from "../containers/About";
import Navbar from "../components/Navbar/Navbar";
import NoMatch from "../components/NoMatch";
import Ledamoter from "../containers/Ledamoter";
import PartiVotes from "../containers/PartiVotes";
import PartiPage from "../containers/Parti";
import VoteringPage from "../containers/voteringpage";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      isMobile: window.innerWidth <= 1000,
      hasBypassed: false
    };
  }
  
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    if(!this.state.hasBypassed)
      this.setState({ isMobile: window.innerWidth <= 1000 });
  };

  render() {
    const { isMobile } = this.state;
    // const isMobile = width <= 1000;
    if (isMobile) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'}}>
          <div style={{width:'60%'}}>
          <h3>
            Denna app är tyvärr inte anpassad för mindre skärmar! För en bättre
            upplevelse, se till att använda en stor skärm :)
          </h3>
          <div>
            <p> Vill du fortsätta ändå? </p>
          <button onClick={() => this.setState({isMobile: false, hasBypassed: true})}> Tryck här </button>
          </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="App_container">
            <Switch>
              <Route exact path="/" component={AppContainer} />
              <Route exact path="/ledamoter" render={() => <Ledamoter />} />
              <Route
                exact
                path="/ledamoter/:id"
                render={props => <Ledamot {...props} />}
              />
              <Route exact path="/partier" render={() => <PartiVotes />} />
              <Route exact path="/parties" render={() => <Partier />} />
              <Route
                exact
                path="/parties/:parti"
                render={props => <PartiPage {...props} />}
              />
              <Route
                exact
                path="/voteringar/:id"
                render={props => <VoteringPage {...props} />}
              />
              <Route exact path="/about" render={() => <About />} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

export default Routes;
