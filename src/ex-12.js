import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 카메라 추가
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    4000
  )

  camera.position.set(0, 20, 100)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // 카메라 이후에 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 20
  controls.maxDistance = 800

  // 컨트롤 업데이트
  controls.update()

  const skyMaterialArray = []
  const texture_ft = new THREE.TextureLoader().load(
    '../static/ex-12/bay_ft.jpg'
  )
  const texture_bk = new THREE.TextureLoader().load(
    '../static/ex-12/bay_bk.jpg'
  )
  const texture_up = new THREE.TextureLoader().load(
    '../static/ex-12/bay_up.jpg'
  )
  const texture_dn = new THREE.TextureLoader().load(
    '../static/ex-12/bay_dn.jpg'
  )
  const texture_rt = new THREE.TextureLoader().load(
    '../static/ex-12/bay_rt.jpg'
  )
  const texture_lf = new THREE.TextureLoader().load(
    '../static/ex-12/bay_lf.jpg'
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  )

  // 반복문
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  // 메쉬 추가
  const skyGeomtry = new THREE.BoxGeometry(2400, 2400, 2400)
  //   const skyMaterial = new THREE.MeshStandardMaterial({
  // color: 0x333333,
  // map: texture,
  //   })
  //   skyMaterial.side = THREE.BackSide
  const sky = new THREE.Mesh(skyGeomtry, skyMaterialArray)
  scene.add(sky)

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  function animate() {
    requestAnimationFrame(animate)
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
