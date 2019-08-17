import React, { Component } from "react";
import ThreeScene from './ThreeScene';
import { Button, Container, Row, Col } from "react-bootstrap";

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasModel: false
    }

  }
  loadModel = (modelUrl, scale) => {
    if (this.state.hasModel) {
      this.threejsScene.destroyModel();
    }

    this.threejsScene.setupModel({ modelUrl, scale });


    this.setState({ hasModel: true });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ThreeScene onRef={ref => (this.threejsScene = ref)}></ThreeScene>

          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => this.loadModel('../models/Table/scene.gltf', { x: 0.1, y: 0.1, z: 0.1 })}>Ver mesa</Button>
            <Button onClick={() => this.loadModel('../models/chair/scene.gltf', { x: 0.005, y: 0.005, z: 0.005 })}>Ver cadeira</Button>
            <Button onClick={() => this.loadModel('../models/rounded_chair/scene.gltf')}>Ver cadeira redonda</Button>
          </Col>
        </Row>

      </Container>

    )
  }
}
export default Main
