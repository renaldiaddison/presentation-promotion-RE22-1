import "./style.css";
import * as THREE from "./three.js/three.js/build/three.module.js";

var renderer, scene, camera, textureLoader, moon;

function createTexture(path) {
  return textureLoader.load(path);
}

function createStar() {
  const geometry = new THREE.SphereGeometry(0.05, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
  const starMesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  starMesh.position.set(x, y, z);
  scene.add(starMesh);
}

function createSun() {
  const geometry = new THREE.IcosahedronGeometry(1, 15);
  const material = new THREE.MeshBasicMaterial({ color: "#FDB813" });
  const sunMesh = new THREE.Mesh(geometry, material);

  sunMesh.position.set(0, 0, 0);
  scene.add(sunMesh);
  return sunMesh;
}

function createRen() {
  const renTexture = textureLoader.load("./assets/ren.jpeg");

  const ren = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: renTexture })
  );

  ren.position.set(10, 0, -10)
  scene.add(ren);
  return ren
}

function createMoon() {
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: createTexture('./assets/moon.jpg'),
      normalMap: createTexture('./assets/normal.jpg'),
    })
  );
  moon.position.z = 30
  moon.position.x = -10

  scene.add(moon);

  return moon
}

function init() {
  scene = new THREE.Scene();

  const FOV = 75;
  const ASPECT = window.innerWidth / window.innerHeight;

  camera = new THREE.PerspectiveCamera(FOV, ASPECT, 0.1, 1000);
  camera.position.setZ(30);
  camera.position.setX(-3);

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  textureLoader = new THREE.TextureLoader();

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  Array(4000).fill().forEach(createStar);
  moon = createMoon();
}

function scrollingAction() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
}

document.body.onscroll = scrollingAction;

function render() {
  requestAnimationFrame(render);
  moon.rotation.x += 0.005
  renderer.render(scene, camera);
}

window.onload = () => {
  init();
  render();
  console.log(camera.position)
};

window.onresize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
