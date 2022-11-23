import './style.css'
import * as THREE from 'three'

var renderer, scene, camera

function init() {
  scene = new THREE.Scene()

  const FOV = 75
  const ASPECT = window.innerWidth / window.innerHeight

  camera = new THREE.PerspectiveCamera(FOV, ASPECT, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

}

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

window.onload = () => {
  init()
  render()
}