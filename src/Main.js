import React, { Component } from "react";
import {  Container, Row, Col } from "react-bootstrap";
import ThreeScene from './ThreeScene';


class Main extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Container>
          <Row>
              <Col>
                <ThreeScene></ThreeScene>
              </Col>
    
          </Row>
      </Container>
    )
  }
}
export default Main
