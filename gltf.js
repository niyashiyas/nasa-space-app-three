import * as THREE from 'three';

function createSolarSystem() {
  const solarSystem = new THREE.Group();

  // Create the sun
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  solarSystem.add(sun);

  // Create planets
  const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const planetDistances = [30, 50, 80, 110, 150, 180, 205, 220];

  const planetColors = [0xdedede, 0xb4a5a5, 0x2194ce, 0xd14e24, 0xffd700, 0xffa500, 0x00a2ff, 0x0015ff];

  const planetRadius = [0.7, 0.8, 0.9, 1.1, 4, 1.9, 2.5, .4];

  for (let i = 0; i < planetNames.length; i++) {
    const planetGeometry = new THREE.SphereGeometry(planetRadius[i], 32, 32);
    const planetMaterial = new THREE.MeshLambertMaterial({ color: planetColors[i] });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    const angle = (i / planetNames.length) * Math.PI * 2;
    const x = planetDistances[i] * Math.cos(angle);
    const z = planetDistances[i] * Math.sin(angle);

    planet.position.set(x, 0, z);

    solarSystem.add(planet);

    const segments = 64; // Number of segments in the circle
const planetOrbitGeometry = new THREE.CircleGeometry(planetDistances[i], segments);
const planetOrbitVertices = [];

for (let j = 0; j <= segments; j++) {
  const theta = (j / segments) * Math.PI * 2;
  const x = planetDistances[i] * Math.cos(theta);
  const z = planetDistances[i] * Math.sin(theta);
  planetOrbitVertices.push(new THREE.Vector3(x, 0, z));
}

const planetOrbit = new THREE.LineLoop(
  new THREE.BufferGeometry().setFromPoints(planetOrbitVertices),
  new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 })
);

// Remove the rotation
// planetOrbit.rotation.x = -Math.PI / 2;

solarSystem.add(planetOrbit);
  
  }

  return solarSystem;
}

export default createSolarSystem;
