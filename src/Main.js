import React, { Component } from "react";
import ThreeScene from './ThreeScene';
import { Carousel } from "react-bootstrap";

const scenesIndex = ['0', '1', '2'];
const DEFAULT_SCENE_NAME = 'threejsScene';

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

    this.stopScenes(selectedIndex);
   

  };

  stopScenes = (selectedIndex) => {
    const destroyIndexes = scenesIndex.filter((index) =>  index !== `${selectedIndex}`);
    
    for (const index of destroyIndexes) {
      this[`${DEFAULT_SCENE_NAME}${index}`].destroyScene();
    }

    this[`${DEFAULT_SCENE_NAME}${selectedIndex}`].loadScene();
  }

  componentDidMount() {

    this.stopScenes(0);

  }

  render() {
    const { index, direction } = this.state;
    return (

      <Carousel interval={null} activeIndex={index} direction={direction} onSelect={this.handleSelect}>
        <Carousel.Item>
          <ThreeScene onRef={ref => (this.threejsScene0 = ref)} modelUrl={'../models/Table/scene.gltf'} scale={{ x: 0.1, y: 0.1, z: 0.1 }}></ThreeScene>
          <Carousel.Caption>
            <h3>Mesa</h3>
            <p>Incrivel mesa</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ThreeScene onRef={ref => (this.threejsScene1 = ref)} modelUrl={'../models/chair/scene.gltf'} scale={{ x: 0.001, y: 0.001, z: 0.001 }}></ThreeScene>

          <Carousel.Caption>
            <h3>Cadeira show show</h3>
            <p>é show</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ThreeScene onRef={ref => (this.threejsScene2 = ref)} modelUrl={'../models/rounded_chair/scene.gltf'} scale={{ x: 0.5, y: 0.5, z: 0.5 }}></ThreeScene>

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
