import React, { Component } from "react";
import ThreeScene from './ThreeScene';
import { Carousel } from "react-bootstrap";

const SCENE_INFOS = [ 
// {threeJs: <ThreeScene  modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>, dataInfo: {header: 'Mesa', info: 'Mesa criada para festa'}},
{threeJs: <ThreeScene  modelUrl={'../models/chair/scene.glb'} scale={{ x: 0.02, y: 0.02, z: 0.02 }}></ThreeScene>, dataInfo: {header: 'teste', info: 'Aquela cadeira'}},
// {threeJs: <ThreeScene  modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.7, y: 0.7, z: 0.7 }}></ThreeScene>, dataInfo: {header: 'Cadeira redonda', info: 'Repare nos angulos'}},
// {threeJs: <ThreeScene  modelUrl={'../models/dna/scene.gltf'} scale={{ x: 0.04, y: 0.04, z: 0.04 }}></ThreeScene>, dataInfo: {header: 'DNA', info: 'Proteinas'}},
// {threeJs: <ThreeScene  modelUrl={'../models/vaso/scene.gltf'} scale={{ x: 0.05, y: 0.05, z: 0.05 }}></ThreeScene>, dataInfo: {header: 'Vaso', info: 'Vasou?'}},
// {threeJs: <ThreeScene  modelUrl={'../models/jupiter/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>, dataInfo: {header: 'Planeta', info: 'O maior'}},
// {threeJs: <ThreeScene  modelUrl={'../models/monstro/scene.gltf'} scale={{ x: 0.03, y: 0.03, z: 0.03 }}></ThreeScene>, dataInfo: {header: 'Grrr', info: 'grrrrr....'}}
];
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
    for (const [index, {threeJs, dataInfo}] of SCENE_INFOS.entries()) {
        if(index === selectedIndex) {
          items.push(<Carousel.Item>
              {threeJs}
              <Carousel.Caption>
                <h3>{dataInfo.header}</h3>
                <p>{dataInfo.info}</p>
              </Carousel.Caption>
            </Carousel.Item>);
       
        } else {

          items.push(<Carousel.Item>
              {DEFAULT_EMPTY_DIV}
              <Carousel.Caption>
              <h3>{dataInfo.header}</h3>
                <p>{dataInfo.info}</p>
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

      <Carousel interval={null} activeIndex={index} direction={direction} onSelect={this.handleSelect} slide={false}>
        {items.map((item) => item)}
      </Carousel>
    )
  }
}
export default Main
