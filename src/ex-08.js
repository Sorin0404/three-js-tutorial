import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // 카메라 추가
  const fov = 120
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 1.8
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
  //   scene.add(ambientLight)

  const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionLight.position.set(-1, 1, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionLight,
    0.2,
    0x0000ff
  )
  //   scene.add(dlHelper)
  //   scene.add(directionLight)

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.5)
  //   scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  //   scene.add(pointLight)
  pointLight.position.set(-2, 0.5, 0.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1)
  //   scene.add(plHelper)

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  //   scene.add(pointLight2)
  pointLight2.position.set(2, 2, 0.5)
  const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.1)
  //   scene.add(plHelper2)

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  //   scene.add(rectLight)
  rectLight.position.set(0.5, 0.5, 1)
  rectLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)

  // 도형추가
  const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.rotation.y = 0.5
  obj01.position.y = 0.2
  scene.add(obj01)

  function render(time) {
    time *= 0.0005 // convert time to seconds

    // obj01.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 바닥 추가
  const PlaneGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(PlaneGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
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
