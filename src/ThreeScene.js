import React, { Component } from "react";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

const width = window.innerWidth;
const height = window.innerHeight;

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.THREE = THREE;
  }

  setupModel = () => {
    // instantiate a loader
    const loader = new this.THREE.OBJLoader();

    // load a resource
    loader.load(
      // resource URL
      '../models/FinalBaseMesh.obj',
      // called when resource is loaded
      (object) => {

        this.model = object;

        this.model.position.x = 0;
        this.model.position.y = 0;
        this.model.position.z = -50;

        this.scene.add(this.model);

        this.start();

      },
      // called when loading is in progresses
      (xhr) => {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      // called when loading has errors
      (error) => {

        console.log(error);

      }
    );

  }

  componentDidMount() {

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupModel();
    this.setupLight();



    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);


  }

  setupLight = () => {
    this.light = new THREE.PointLight(0xff0000, 1, 100);
    this.light.position.set(10, 10, 10);
    this.scene.add(this.light);
  }

  setupRenderer = () => {

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

  }
  setupScene = () => {
    //ADD SCENE
    this.scene = new THREE.Scene();

  }

  setupCamera = () => {
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.model.rotation.x += 0.01
    this.model.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene
