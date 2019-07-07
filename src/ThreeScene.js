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
    this.loadModelByUrl('../models/scene.gltf');
  }

  loadModelByUrl = (url) => {
    // instantiate a loader
    let loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        // called when the resource is loaded
        this.scene.add(gltf.scene);
        gltf.scene.traverse((child) => {

          if (child instanceof THREE.Mesh) {

            child.material.envMap = this.textureCube;
            // add any other properties you want here. check the docs.

          }

        });

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
    this.setupModel();
    this.setupLight();
    this.setupControls();



    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);


  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

  }

  setupLight = () => {

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);

    const width = 5;
    const height = 5;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
    rectLight.position.set(10, 5, 0);
    rectLight.lookAt(0, 0, 0);
    this.scene.add(rectLight)

    const rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper);

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
    this.camera.position.set(0, 0, 10);
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
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene
