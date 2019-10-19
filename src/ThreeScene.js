import React, { Component } from "react";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import * as GLTFLoader from 'three-gltf-loader';
import * as FBXLoader from 'three-fbx-loader';
import OrbitControls from 'three-orbitcontrols';

import { ClipLoader } from 'react-spinners';
import { Button, ButtonGroup } from "react-bootstrap";

OBJLoader(THREE);
GLTFLoader(THREE);
FBXLoader(THREE);

let width = window.innerWidth / 1;
let height = window.innerHeight / 1;
const DEFAULT_COLORS = [ 0xffffff, 0x5DBCD2, 0xFFC58F, 0xC9E2FF, 0x20B2AA];
const DEFAULT_COLORS_INTENCITY = [2, 5, 6];

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.THREE = THREE;

    const { modelUrl, scale } = props;
    this.currentColor = 0;
    this.selectedColor = DEFAULT_COLORS[this.currentColor];

    this.currentIntensity = 0;
    this.selectedIntensity = DEFAULT_COLORS_INTENCITY[this.currentIntensity];

    this.state = {
      loading: false,
      modelUrl,
      scale
    }

  }



  destroyScene = () => {

    this.stop();
    this.scene.dispose();
  }

  loadScene = () => {
    this.start();

  }

  setupModel = () => {
    // instantiate a loader
    let loader = new GLTFLoader();
    const { modelUrl, scale } = this.state;
    loader.load(
      modelUrl,
      (gltf) => {
        // called when the resource is loaded
        this.model = gltf.scene;
        this.scene.add(this.model);

        if (scale) {
          this.model.scale.set(scale.x, scale.y, scale.z);
        }

        this.setState({ loading: false });

        var box = new THREE.Box3().setFromObject(this.model);
        var center = new THREE.Vector3();
        box.getCenter(center);
        this.model.position.sub(center); // center the model

        this.start();
        this.emit('started');
      },
      () => {
        this.setState({ loading: true });
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      },
    );
  }




  componentDidMount() {

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLight();
    this.setupControls();
    this.setupModel();

    window.addEventListener('resize', this.onWindowResize, false);

  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    this.controls.enableZoom = false;

  }

  setupLight = () => {
    var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);

    this.light1 = new THREE.PointLight(this.selectedColor, this.selectedIntencity, 50);

    this.lightSphereMaterial = new THREE.MeshBasicMaterial({ color: this.selectedColor });
    
    this.light1.add(new THREE.Mesh(sphere, this.lightSphereMaterial));

    this.light1.position.x = this.camera.position.x;
    this.light1.position.y = this.camera.position.y + 5;
    this.light1.position.z = this.camera.position.z;
    this.scene.add(this.light1);
   
  }

  setupRenderer = () => {

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    this.renderer.gammaOutput = true;

  }


  setupScene = () => {
    //ADD SCENE
    this.scene = new THREE.Scene();
   
    this.scene.background = new THREE.Color('black');
  }

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    this.camera.position.set(0, 0, 4);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }

  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
    this.frameId = undefined;

  }

  animate = () => {
    const { spin } = this.props;

    if (spin) {
      this.model.rotation.x += 0.01
      this.model.rotation.y += 0.01
    }

    // this.light1.intensity = 0.5 * Math.random() * 10;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {

    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  changeColor = () => {
    this.selectedColor = DEFAULT_COLORS[this.currentColor];
    
    const newColor = new THREE.Color(this.selectedColor);
    this.light1.color = newColor;
    this.lightSphereMaterial.color = newColor;

    this.currentColor++;

    if(this.currentColor === DEFAULT_COLORS.length) this.currentColor = 0;
  }

  changeIntensity = () => {
    this.selectedIntensity = DEFAULT_COLORS_INTENCITY[this.currentIntensity];
    
    this.light1.intensity =  this.selectedIntensity;

    this.currentIntensity++;

    if(this.currentIntensity === DEFAULT_COLORS_INTENCITY.length) this.currentIntensity = 0;
  }


  onWindowResize = () => {
    width = window.innerWidth / 1;
    height = window.innerHeight / 1;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();



    this.renderer.setSize(width, height);

  }

  render() {
    const loaderDimension = 200;
    return (

      <div ref={(mount) => { this.mount = mount }}>
        <div style={{ position: 'absolute', top: `${height / 2 - loaderDimension / 2}px`, right: `${width / 2 - loaderDimension / 2}px` }}>
          <ClipLoader
            sizeUnit={"px"}
            size={loaderDimension}
            color={'#FFC300'}
            loading={this.state.loading}
          />
        </div>
        <div style={{ position: 'absolute', right: `${width / 2 - loaderDimension / 2}px` }}>
          <ButtonGroup>
            <Button onClick={this.changeColor}>Light color</Button>
            <Button onClick={this.changeIntensity}>Light intensity</Button>
         </ButtonGroup>
          
       </div>
      </div>
    )
  }
}
export default ThreeScene
