import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import createSolarSystem from './gltf';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';




// Scene

const scene = new THREE.Scene();
let isRotatingForward = false;
//helpers
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;



// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
//orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Set the target point (center of rotation)
controls.enablePan = true;     // Enable panning
controls.enableZoom = true;    // Enable zooming
controls.enableRotate = true;  // Enable rotation

// Function to create a bounding box mesh
function createBoundingBox(color, size) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.3,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

// Create a bounding box mesh around the model


// Load GLB Model (Perseverance)
const gltfLoader = new GLTFLoader();
let gltfModel;
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
gltfLoader.load('./public/Per.glb', (gltf) => {
  gltfModel = gltf.scene;
  gltfModel.position.set(0, -2, -2); // Initial position

  scene.add(gltfModel);
});

// Add ambient light inside the model
const ambientLight = new THREE.AmbientLight(0x404040); // Set the color of ambient light
scene.add(ambientLight);

// Add directional light above the model
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Set the color and intensity of directional light
directionalLight.position.set(0, 0, -1); // Position the light above the model
scene.add(directionalLight);

const solarSystem = createSolarSystem();
scene.add(solarSystem);

// Add event listeners for WASD movement
const moveSpeed = 0.1;
const moveVector = new THREE.Vector3();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      moveVector.z = -moveSpeed;
      break;
    case 's':
      moveVector.z = moveSpeed;
      break;
    case 'a':
      moveVector.x = -moveSpeed;
      break;
    case 'd':
      moveVector.x = moveSpeed;
      break;
    case 'q':
      isRotatingForward=True;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
    case 's':
      moveVector.z = 0;
      break;
    case 'a':
    case 'd':
      moveVector.x = 0;
      break;
    case 'q':
      isRotatingForward=False;
      break;
  }
});





// Render loop
const rotationSpeed = 0.5;
const renderLoop = () => {
 
  if (gltfModel) {
    gltfModel.position.add(moveVector);
    if (isRotatingForward) {
      // Rotate the GLB model forward
      gltfModel.rotation.x += rotationSpeed;
      camera.rotation.x+=rotationSpeed;
    }
    // Update the bounding box position
  }

  camera.position.add(moveVector);
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
};

renderLoop();
