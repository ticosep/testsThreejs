import React, { Component } from "react";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import * as GLTFLoader from 'three-gltf-loader';
import * as FBXLoader from 'three-fbx-loader';
import OrbitControls from 'three-orbitcontrols';
import { Container } from "react-bootstrap";
import { ClipLoader } from 'react-spinners';

OBJLoader(THREE);
GLTFLoader(THREE);
FBXLoader(THREE);

let width = window.innerWidth / 2;
let height = window.innerHeight / 2;

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.THREE = THREE;

    this.state = {
      loading: false
    }

  }



  destroyModel = () => {
    this.scene.remove(this.model);
  }

  setupModel = ({ modelUrl, scale }) => {
    // instantiate a loader
    let loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        // called when the resource is loaded
        this.scene.add(gltf.scene);
        this.model = gltf.scene;

        if (scale) {
          this.model.scale.set(scale.x, scale.y, scale.z);
        }

        this.setState({ loading: false });
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

    this.start();

    this.props.onRef(this)

    window.addEventListener('resize', this.onWindowResize, false);

  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

  }

  setupLight = () => {

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);

    const color = 0xFFFFFF;
    const intensity = 1;
    const directlight = new THREE.DirectionalLight(color, intensity);
    directlight.position.set(-1, 2, 4);
    this.scene.add(directlight);


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

    const path = "../cubemap/";
    const urls = [path + "posx.jpg", path + "negx.jpg",
    path + "posy.jpg", path + "negy.jpg",
    path + "posz.jpg", path + "negz.jpg"];

    this.textureCube = new THREE.CubeTextureLoader().load(urls);
    this.textureCube.format = THREE.RGBFormat;
    this.textureCube.mapping = THREE.CubeReflectionMapping;
    this.textureCube.encoding = THREE.sRGBEncoding;

    this.scene.background = this.textureCube;
  }

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    this.camera.position.set(0, 0, 4);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);

    this.props.onRef(undefined);
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
    const { spin } = this.props;

    if (spin) {
      this.model.rotation.x += 0.01
      this.model.rotation.y += 0.01
    }

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {

    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }


  onWindowResize = () => {
    width = window.innerWidth / 3;
    height = window.innerHeight / 3;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();



    this.renderer.setSize(width, height);

  }

  render() {

    return (
      <Container>

        <div
          style={{width, height, position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          ref={(mount) => { this.mount = mount }}
        ></div>
        <div style={{width, height, position: "fixed", top: "75%", left: "75%", transform: "translate(-75%, -75%)" }}>
          <ClipLoader
            sizeUnit={"px"}
            size={200}
            color={'#FFC300'}
            loading={this.state.loading}
          />
        </div>


      </Container>

    )
  }
}
export default ThreeScene
