import React, { Component } from "react";
import ThreeScene from './ThreeScene';
import { Carousel } from "react-bootstrap";

const SCENES = [ <ThreeScene  modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>,
<ThreeScene  modelUrl={'../models/chair/scene.gltf'} scale={{ x: 0.001, y: 0.001, z: 0.001 }}></ThreeScene>,
 <ThreeScene  modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>,
 <ThreeScene  modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>,
<ThreeScene  modelUrl={'../models/chair/scene.gltf'} scale={{ x: 0.001, y: 0.001, z: 0.001 }}></ThreeScene>,
 <ThreeScene  modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>,
 <ThreeScene  modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>,
<ThreeScene  modelUrl={'../models/chair/scene.gltf'} scale={{ x: 0.001, y: 0.001, z: 0.001 }}></ThreeScene>,
 <ThreeScene  modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>
]

const DEFAULT_EMPTY_DIV = <div style={{ width: window.innerWidth, height: window.innerHeight, backgroundColor:'black'}}></div>

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      direction: 'prev'
    }

  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex, direction: e.direction });

  };

  getItens(selectedIndex) {
    const items = [];
    for (const [index, scene] of SCENES.entries()) {
        if(index === selectedIndex) {
          items.push(<Carousel.Item>
              {scene}
              <Carousel.Caption>
                <h3>Mesa</h3>
                <p>Incrivel mesa</p>
              </Carousel.Caption>
            </Carousel.Item>);
       
        } else {

          items.push(<Carousel.Item>
              {DEFAULT_EMPTY_DIV}
              <Carousel.Caption>
                <h3>Mesa</h3>
                <p>Incrivel mesa</p>
              </Carousel.Caption>
            </Carousel.Item>);
       
      }
      
      
    }

    return items;
  }
   


  render() {
    const { index, direction } = this.state;
    const items = this.getItens(index);
    
    return (

      <Carousel interval={null} activeIndex={index} direction={direction} onSelect={this.handleSelect}>
        {items.map((item) => item)}
      </Carousel>
    )
  }
}
export default Main
