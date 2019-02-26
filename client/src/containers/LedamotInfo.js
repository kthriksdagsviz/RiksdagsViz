import React, { Component } from 'react'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import { requestVoteringarByYear } from '../actions'
import {Jumbotron, Container, Card, CardDeck, Row, Col, Tabs, Tab } from 'react-bootstrap'

import _ from 'lodash'
class LedamotInfo extends Component {
    state = {
      a:0
    }

    componentDidMount(){
    

      
    }

    renderPersonUppgift = () =>{
        let ledamotUppgift = this.props.ledamot.personuppgift.uppgift

        return(
            <Tabs defaultActiveKey="Webbsida">
                {ledamotUppgift.map((uppgift, i) => (
                    <Tab key={i} eventKey={uppgift.kod} title={uppgift.kod}>
                       <p style={{marginTop:'1em'}}> {this.getUppgift(uppgift.uppgift)}</p> 
                    </Tab>
                ))}
            </Tabs>
        )
    }

    getUppgift = (uppgift) => {
        if(uppgift.length > 0){
            if(_.isEmpty(uppgift[0])){
                return "Ingen data"
            }
            else if(uppgift[0] == "true"){
                return "Sant!"
            }
           
            else{
                return uppgift[0]
            }
        }
    }
    renderPersonUppdrag = () =>{
        let ledamotUppdrag = this.props.ledamot.personuppdrag.uppdrag
        const numberOfRows = Math.ceil(ledamotUppdrag.length / 3)
       let a = Array(numberOfRows).fill().map((_, rowIndex) => (
            <Row key={rowIndex} style={{marginBottom:'30px'}}>
            {
            ledamotUppdrag.slice(rowIndex * 3, (rowIndex *3) + 3).map(uppdrag => (
                <Col >
                <Card>
                <Card.Header> {uppdrag.roll_kod} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <p> Från: {uppdrag.from} - Till: {uppdrag.tom} </p>
                            <p> Status: {uppdrag.status}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
            )) 
        return a
    }


    render() {
        console.log(this.props.ledamot)
      return (  
        <div className="ledamot_info_container">
             <Container>
            <Jumbotron>
                {this.renderPersonUppgift()}
                
            </Jumbotron>
                <h2>Senaste uppdrag</h2>
                {this.renderPersonUppdrag()}
            </Container>
        </div>
      );
    }
  }
  



  const mapStateToProps = state => ({
    voteringar: state.voteringar
})

const mapDispatchToProps = dispatch => {
//actions:bindActionCreators(actions, dispatch),
    return {
        voteringarByYear: (years, parties) => dispatch(requestVoteringarByYear(years, parties)),
    }
}
    
  export default connect(null, null)(LedamotInfo);
    