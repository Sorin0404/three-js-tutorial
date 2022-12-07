import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  console.log(OrbitControls)

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
  camera.position.y = 2
  camera.position.z = 1.8
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  // OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 4
  controls.maxPolarAngle = Math.PI / 2
  controls.update()

  // 도형추가
  const geometry = new THREE.IcosahedronBufferGeometry(0.5, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.rotation.y = 0.5
  obj.position.set(0.5, 0.5, 0)
  scene.add(obj)
  obj.castShadow = true
  obj.receiveShadow = true

  const geometry2 = new THREE.IcosahedronBufferGeometry(0.5, 0)
  const material2 = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  })
  const obj2 = new THREE.Mesh(geometry2, material2)
  obj2.position.set(-0.5, 1.2, 0.5)
  scene.add(obj2)
  obj2.castShadow = true

  // 바닥 추가
  const PlaneGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(PlaneGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  plane.receiveShadow = true

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  //   ambientLight.castShadow = true // 그림자 X

  const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionLight.position.set(-1.5, 2, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionLight)
  directionLight.castShadow = true // 그림자 O
  directionLight.shadow.mapSize.width = 2048
  directionLight.shadow.mapSize.height = 2048
  directionLight.shadow.radius = 8

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.5)
  //   scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(1, 1, 0.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1)
  //   scene.add(pointLight)
  //   scene.add(plHelper)
  //   pointLight.castShadow = true // 그림자 O

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  rectLight.position.set(0.5, 0.5, 1)
  rectLight.lookAt(0, 0, 0)
  //   scene.add(rectLight)
  //   rectLight.castShadow = true // 그림자 X

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  //   scene.add(spotLight)
  //   spotLight.castShadow = true // 그림자 O

  function animate() {
    requestAnimationFrame(animate)

    obj.rotation.y += 0.03
    obj2.rotation.x += 0.01
    obj2.rotation.y += 0.01

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

    renderer.render(scene, camera)
  }
  animate()

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
