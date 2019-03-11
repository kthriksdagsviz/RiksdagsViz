import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap'
import { Divider } from '@material-ui/core'
const cardStyle={
  width:'18rem',
  height:'41  rem',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'

}
const cardImageStyle={
  width:'100%',
  height:'17rem',
  overflowY:'hidden'
}

const cardTitleStyle={
  fontWeight:'bold',
  marginBottom:'1em'
}

class Hello extends Component {
    render() {
      return (
        <div className="about_container">
          <Container>

            <div style={{marginTop: '2em'}}>
              <h1> Vad är Riksdagsviz?</h1>
              <Divider />
              <p style={{marginTop:'1em'}}>  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                 pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                 culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>

            <h1 style={{margin:'1em 0 .5em 0'}}> Vilka har gjort Riksdagsviz? </h1>
            <Divider />

            <Row style={{marginBottom:'30px', marginTop:'1em'}}>
            <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/ben.png'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Ben Forsrup</Card.Title>
                      <Card.Text>
                        Backend, Frontend och gruppansvarig
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                        
                      </Card.Text>
                      <Card.Link href="mailto:forsrup@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/ben-forsrup-43b230a4/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={cardStyle}>
                <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/oscar.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle} >Oscar Wiigh</Card.Title>
                      <Card.Text>
                      UX, Frontend och Git
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                      </Card.Text>
                      <Card.Link href="mailto:wiigh@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/wiigh/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              
              
              </Col>
              <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/adrian.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Adrian Berger</Card.Title>
                      <Card.Text>
                        Frontend och datahantering
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                      </Card.Text>
                      <Card.Link href="mailto:aberger@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/adrian-berger-810074142/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              </Col>
              
          </Row>
          <Row>
          <Col>
          <Card style={cardStyle}>
          <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/martin.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Martin Wedberg</Card.Title>
                      <Card.Text>
                      Frontend och statistik
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                      </Card.Text>
                      <Card.Link href="mailto:marwed@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/martin-wedberg-5667ba14a/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/emil.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Emil Dickson</Card.Title>
                      <Card.Text>
                        Frontend och Backend
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                      </Card.Text>
                      <Card.Link href="mailto:edickson@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/emil-dickson-2813b668/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
              <Card style={cardStyle}>
                  <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/jonatan.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Jonatan Lindström</Card.Title>
                      <Card.Text>
                        Frontend och statistik
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum."
                      </Card.Text>
                      <Card.Link href="mailto:jonatan3@kth.se">Mail</Card.Link>
                      <Card.Link href="https://www.linkedin.com/in/jonatan-lindstr%C3%B6m-95047b165/" target="_blank">LinkedIn</Card.Link>
                    </Card.Body>
                </Card>
              </Col>
          </Row>

          </Container>
        </div>
      );
    }
  }
  
  export default Hello;
  