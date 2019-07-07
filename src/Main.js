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

         <Row>
            <Col>
              <ThreeScene modelUrl={'../models/Table/scene.gltf'} name={'Table'} spin={false} scale={{x:0.1,y:0.1,z:0.1}}></ThreeScene>
            </Col>
         </Row>

         <Row>
            <Col>
              <ThreeScene modelUrl={'../models/LilTokyo/scene.gltf'} name={'Lil tokyo'} spin={false} scale={{x:0.01,y:0.01,z:0.01}}></ThreeScene>
            </Col>
         </Row>

        </Container>
      </div>

    )
  }
}
export default Main
