import React, { Component } from "react";
import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import * as GLTFLoader from 'three-gltf-loader';
import * as FBXLoader from 'three-fbx-loader';
import OrbitControls from 'three-orbitcontrols';

OBJLoader(THREE);
GLTFLoader(THREE);
FBXLoader(THREE);

const width = window.innerWidth / 3;
const height = window.innerHeight / 3;

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.THREE = THREE;
  }

  setupModel = () => {
    // instantiate a loader
    let loader = new GLTFLoader();
    const {modelUrl} = this.props;

    loader.load(
      modelUrl,
      (gltf) => {
        // called when the resource is loaded
        this.scene.add(gltf.scene);
        
        gltf.scene.traverse((child) => {

          if (child instanceof THREE.Mesh) {
                  
            child.material.envMap = this.textureCube;
            // add any other properties you want here. check the docs.

          }

        });

        this.model = gltf.scene;

        this.start();
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
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
    this.setupCubeMap();
    this.setupLight();
    this.setupControls();
    this.setupModel();

  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

  }

  setupLight = () => {

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);

    
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

  setupCubeMap = () => {
    const path = "../cubemap/";
    const urls = [path + "posx.jpg", path + "negx.jpg",
    path + "posy.jpg", path + "negy.jpg",
    path + "posz.jpg", path + "negz.jpg"];

    this.textureCube = new THREE.CubeTextureLoader().load(urls);
    this.textureCube.format = THREE.RGBFormat;
    this.textureCube.mapping = THREE.CubeReflectionMapping;
    this.textureCube.encoding = THREE.sRGBEncoding;


    // Materials
    const cubeShader = THREE.ShaderLib["cube"];
    const cubeMaterial = new THREE.ShaderMaterial({
      fragmentShader: cubeShader.fragmentShader,
      vertexShader: cubeShader.vertexShader,
      uniforms: cubeShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    cubeMaterial.uniforms["tCube"].value = this.textureCube;
    Object.defineProperty(cubeMaterial, 'map', {

      get: function () {

        return this.uniforms.tCube.value;

      }

    });

    // Skybox
    const cubeMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), cubeMaterial);
    this.sceneCube.add(cubeMesh);
  }
  setupScene = () => {
    //ADD SCENE
    this.scene = new THREE.Scene();
    this.sceneCube = new THREE.Scene();

  }

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    this.camera.position.set(0, 0, 4);
    this.cameraCube = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
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
    const {spin} = this.props;

    if(spin) {
      this.model.rotation.x += 0.01
      this.model.rotation.y += 0.01
    }
    
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {

    this.camera.lookAt(this.scene.position);
    this.cameraCube.rotation.copy(this.camera.rotation);

    this.renderer.render(this.sceneCube, this.cameraCube);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const {name} = this.props;
    return (
      <Jumbotron>
        <Container>
        <Row>
            <Col>
                <div
                  style={{ width, height }}
                  ref={(mount) => { this.mount = mount }}
                />
            </Col>
            <Col>
              <h4>A model running in three js with react, this one called {name}</h4>
              <Button> Read About </Button>
            </Col>
          </Row>
        </Container>
         
      </Jumbotron>
     
    )
  }
}
export default ThreeScene
