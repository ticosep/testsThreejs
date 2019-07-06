import React, { Component } from "react";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import * as GLTFLoader from 'three-gltf-loader';
import * as FBXLoader from 'three-fbx-loader';
import OrbitControls from 'three-orbitcontrols';

OBJLoader(THREE);
GLTFLoader(THREE);
FBXLoader(THREE);

const width = window.innerWidth;
const height = window.innerHeight;

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.THREE = THREE;
  }

  setupModel = () => {
    // instantiate a loader
    const loader = new FBXLoader();

    loader.load('../models/potatosfbx.fbx', (object3d) => {
      this.scene.add(object3d);

      this.model = object3d;

      this.start();
    });

  }

  componentDidMount() {

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupModel();
    this.setupLight();
    this.setupControls();



    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);


  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = false
  }

  setupLight = () => {
    const hlight = new THREE.AmbientLight(0x404040, 100);
    this.scene.add(hlight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    this.scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    this.scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    this.scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    this.scene.add(light4);
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

    this.scene.background = new THREE.Color(0xdddddd);

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
