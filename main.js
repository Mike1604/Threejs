import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const torusTexture = new THREE.TextureLoader().load('gold.jpg')
const geometry = new THREE.TorusKnotGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshToonMaterial( { map:torusTexture, wireframe: true } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(60));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('fondo.png');
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('kendrick.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);


const moraleTexture = new THREE.TextureLoader().load('morale.jpg');

const album = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: moraleTexture }));

scene.add(album);

album.position.z = 30;
album.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  album.rotation.x += 0.05;
  album.rotation.y += 0.075;
  album.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x+= 0.01;
  torusKnot.rotation.y+= 0.005;
  torusKnot.rotation.z += 0.01;
 
  renderer.render(scene, camera);
}

animate();
