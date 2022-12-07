import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  // 카메라 추가
  const fov = 80
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   )
  //   camera.position.set(0, 0, 2)
  camera.position.x = 2
  camera.position.y = 2
  camera.position.z = 1
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffbb, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 도형추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.y = 0.5
  scene.add(obj01)

  function render(time) {
    time *= 0.0005 // convert time to seconds

    // obj01.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 바닥 추가
  const PlaneGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const plane = new THREE.Mesh(PlaneGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
