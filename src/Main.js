import React, { Component } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import ThreeScene from './ThreeScene';


class Main extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#736F6E"}}>
        <Container fluid={true}>

          <Row>
             
            <Col>
              
              <ThreeScene modelUrl={'../models/nescauenbe.gltf'}></ThreeScene>
            </Col>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Nescau</h1>
              </Jumbotron>
            </Col>
          
          </Row>

          <Row>
            <Col>
              <ThreeScene modelUrl={'../models/monke.gltf'} spin={true}></ThreeScene>
            </Col>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Macaco giratorio</h1>

              </Jumbotron>
            </Col>
          </Row>

        </Container>
      </div>

    )
  }
}
export default Main
