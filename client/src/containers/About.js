import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap'

const cardStyle={
  width:'18rem',
  height:'28rem',
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
            <h1 style={{margin:'1em 0'}}> Gruppen </h1>

            <Row style={{marginBottom:'30px'}}>
            <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/ben.png'}/>
                  </div>
                    <Card.Body>
                      <Card.Title style={cardTitleStyle}>Ben Forsrup</Card.Title>
                      <Card.Text>
                        Backend, Frontend och gruppansvarig
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
  