import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ThreeScene from './ThreeScene';

class Main extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#736F6E"}}>
        <Container fluid={true}>
          <Row>
            <Col>
              <ThreeScene modelUrl={'../models/nescauenbe.gltf'} name={'Nescau'}></ThreeScene>
            </Col>
          </Row>

          <Row>
            <Col>
              <ThreeScene modelUrl={'../models/monke.gltf'} name={'Monkey'} spin={true}></ThreeScene>
            </Col>
         </Row>

        </Container>
      </div>

    )
  }
}
export default Main
