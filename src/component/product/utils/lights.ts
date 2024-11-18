import * as THREE from 'three'

export const createLights = () => {
  const lights = {
    ambient: new THREE.AmbientLight(0xffffff, 0.4),
    top: new THREE.DirectionalLight(0xffffff, 0.7),
    front: new THREE.DirectionalLight(0xffffff, 0.6),
    left: new THREE.DirectionalLight(0xffffff, 0.3),
    right: new THREE.DirectionalLight(0xffffff, 0.3),
    back: new THREE.DirectionalLight(0xffffff, 0.2),
  }

  // 조명 위치 설정
  lights.top.position.set(0, 10, 0).normalize()
  lights.front.position.set(0, 0, 5).normalize()
  lights.left.position.set(-3, 2, 0).normalize()
  lights.right.position.set(3, 2, 0).normalize()
  lights.back.position.set(0, 2, -3).normalize()

  // 그림자 설정
  ;[lights.top, lights.front, lights.left, lights.right].forEach((light) => {
    light.castShadow = true
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500
    light.shadow.radius = 4
    light.shadow.bias = -0.0001
  })

  return Object.values(lights)
}
