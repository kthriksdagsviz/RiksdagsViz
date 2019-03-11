import React, { Component } from 'react';
import { Container, Card, Col, Row, Badge } from 'react-bootstrap'
import { Divider } from '@material-ui/core'
const cardStyle={
  width:'21rem',
  height:'45rem',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'

}
const cardImageStyle={
  width:'100%',
  height:'20rem',
  overflowY:'hidden'
}

const cardTitleStyle={
  fontWeight:'bold',
}

const badgeStyle={
  display: 'flex',
  width: '100%',
  marginBottom: '0.4em'
}

class Hello extends Component {
    render() {
      return (
        <div className="about_container">
          <Container>

            <div style={{marginTop: '2em'}}>
              <h1> What is RiksdagsViz?</h1>
              <Divider />

              <h4 style={{marginTop: '1em', textAlign:'center'}}> Video description </h4>
              <div >
              <iframe src="https://player.vimeo.com/video/309856272" width="1140" height="460" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              <p style={{textAlign:'center'}}>
                <a href="https://vimeo.com/309856272">[DT2140@KTH] A jenga game in Augmented Reality: JengAR</a> 
                from <a href="https://vimeo.com/user93623201">Ben Forsrup</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
                {/* video */}
                </div>

              <h4 style={{marginTop: '1em', fontWeight:'bold'}}> Background </h4>
              <p style={{marginTop:'1em'}}>  During the last few years the world political climate has changed, alot. 
              In the light of these recent changes, the importance of political awareness has significantly increased. 
              The need to know what’s going on in the buildings of power is dire. Fortunately for us, 
              data from the Swedish parliament is open to everyone, the only problem is; it needs to be properly understood. 
              It needs to be visualized! Visualizing the data of the Swedish parliament is thus probably more relevant 
              today than ever before. Doing so will not only be an interesting and challenging programming task; 
              the visualization could also contribute to a more transparent society.</p>

              <h5> Goals </h5>
              Bridge the gap between decision-makers and citizens by making public voting data more digestible
              Educate users about how the decision-making process in the Swedish political system works
              Create an exploratory tool that is easy to use and understand
              <h5 style={{marginTop:'1em'}}> Challenges </h5>
              Condensing large amounts of data into an appealing visualization.
              Ensuring that deep knowledge of the political process isn’t a requirement to use the visualization.
              The technical challenge of bringing different technologies together.

              <h4 style={{marginTop:'1em', fontWeight:'bold'}}> Visual structures </h4>
              <p style={{marginTop:'1em'}}>  
              In RiksdagsViz, we have mapped the data available to a few different visual structures.
              <br />
              <br />
              - A map of the chairs of parliament. A spatial structure letting users know where a member of parliament or an entire party sits. Party affiliation is represented by the party color.
              <br />
              - A chord diagram showing how similar the parties are when voting in parliament.
              <br />
              - Donut charts, visualizing the gender and age distributions for each party.
              <br />
              - Another spatial structure in the form of a map of Sweden, showing where a party’s parliament members are from.
              <br />
              - Tables and lists displaying everything from parliament members and news articles to percentages of a party’s likeness to another party in different votings.
              <br />
              <br />
              On a more simplistic note, we decided to use party colors and logos prominent on the site, since this is what people usually associate them with. For the same reason we used pictures of individual parliament members, whenever this was available.
              </p>

                  <h4 style={{marginTop:'1em', fontWeight:'bold'}}> Learning objectives reached </h4>
              <p style={{marginTop:'1em'}}>  We achieved our group goal of developing an extensive and comprehensible
               visualization of the data of the Swedish parliament. We also sharpened our programming skills and developed
                as frontend designers. In the end, we are proud to have produced the tool we set out to create.</p>
            </div>

            <h1 style={{margin:'1em 0 .5em 0'}}> The team</h1>
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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">Backend</Badge>
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Group leader</Badge>
                      </div>
                      From setting up the project website in React to building and publishing to Heroku, Ben has been the group leader for the project, making sure everyone's contributions work together. Furthermore, Ben created the general layout and routings for the website and set up the endpoints in the backend. Finally, Ben added many details on the site, such as the tutorial and the modal on the index page.

                        
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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">UX</Badge>
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Git</Badge>
                      </div>
                      Creating the interactive parliament member map and linking data to it was Oscars main task during the project. His contributions also included creating a first design of the website as well as maintaining the git repository.
                      
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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Data management</Badge>
                      </div>
                      Mainly worked together with Martin on different data visualizations. Being the main responsible of the logic and visualization of the party constituency distribution in the country (the Sweden map on the party page). Also contributed to the creating the other visualizations on the same page. Helped with overall optimization and css:ing.

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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Statistics</Badge>
                      </div>
                      Worked together with Adrian on different data visualizations. The visualizations of the party page being the main ones making it to the final product. Martin also helped with the translation of the initially English application, to the final Swedish one. Also helped writing the filtering algorithm of the search function on the start page. 

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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Backend</Badge>
                      </div>
                      Getting the data for the chord diagram and giving it a good structure was the main task. To extend upon this Emil also helped to check the math behind the chord diagram as well as styling said page. He also collaborated with Jonatan in creating the application logic behind the chord diagram page, such as making the timeline work as expected.
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
                      <div style={badgeStyle} className="about_badges">
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Statistics</Badge>
                      </div>
                      With the goal of comparing parties Jonatan created the chord diagram, the data handling and the math behind it. Together with Emil he also worked on other aspects of the chord diagram page, such as the timeline. Additionally, Jonatan was the one who kept in touch with Riksdagen for when the API was malfunctioning.
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
  