import React, { Component } from "react";
import ThreeScene from './ThreeScene';
import { Carousel} from "react-bootstrap";

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }


  render() {
    return (

      <Carousel>
        <Carousel.Item>
              <ThreeScene modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>
          <Carousel.Caption>
            <h3>Mesa</h3>
            <p>Incrivel mesa</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
                <ThreeScene modelUrl={'../models/chair/scene.gltf'} scale={{ x: 0.001, y: 0.001, z: 0.001 }}></ThreeScene>

          <Carousel.Caption>
            <h3>Cadeira show show</h3>
            <p>é show</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
                <ThreeScene modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>

          <Carousel.Caption>
            <h3>Essa é redonda</h3>
            <p>Olhe os angulos.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    

   
    
           
    )
  }
}
export default Main
