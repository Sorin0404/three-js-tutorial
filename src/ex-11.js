import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x004fff
  const objColor = 0xffffff
  const FloorColor = 0x555555

  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(FogColor)
  //   scene.fog = new THREE.Fog(FogColor, 1, 8)
  scene.fog = new THREE.FogExp2(FogColor, 0.2)

  // 카메라 추가
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.set(0, 2, 3)
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
  controls.minDistance = 3
  controls.maxDistance = 6
  controls.maxPolarAngle = Math.PI / 2

  // 컨트롤 업데이트
  controls.update()

  // 도형추가
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80)
  const material = new THREE.MeshStandardMaterial({
    color: objColor,
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.set(0, 0.8, 0)
  scene.add(obj)

  // 바닥 추가
  const PlaneGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: FloorColor,
  })
  const plane = new THREE.Mesh(PlaneGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  // 빛
  const directionLight = new THREE.DirectionalLight(0xffffff, 1)
  directionLight.position.set(1, 1, 1)
  scene.add(directionLight)

  function animate() {
    requestAnimationFrame(animate)

    obj.rotation.y += 0.01

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
