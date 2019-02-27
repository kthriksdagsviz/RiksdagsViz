import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap'

const cardStyle={
  width:'18rem',
  height:'25rem',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'

}
const cardImageStyle={
  width:'100%',
  height:'18rem',
  overflowY:'hidden'
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
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/oscar.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title>Oscar Wiigh</Card.Title>
                      <Card.Text>
                        Oscar has done this and that and some more even.
                      </Card.Text>
                    </Card.Body>
                </Card>
              
              
              </Col>
              <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/adrian.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title>Adrian Berger</Card.Title>
                      <Card.Text>
                        Adrian has done this and that and some more even.
                      </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/ben.png'}/>
                  </div>
                    <Card.Body>
                      <Card.Title>Ben Forsrup</Card.Title>
                      <Card.Text>
                        Ben has done this and that and some more even.
                      </Card.Text>
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
                      <Card.Title>Martin Wedberg</Card.Title>
                      <Card.Text>
                        Martin has done this and that and some more even.
                      </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
              <Card style={cardStyle}>
              <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/emil.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title>Emil Dickson</Card.Title>
                      <Card.Text>
                        Emil has done this and that and some more even.
                      </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
              <Col>
              <Card style={cardStyle}>
                  <div style={cardImageStyle}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL +  '/group_pictures/jonatan.jpeg'}/>
                  </div>
                    <Card.Body>
                      <Card.Title>Jonatan Lindström</Card.Title>
                      <Card.Text>
                        Jonatan has done this and that and some more even.
                      </Card.Text>
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
  