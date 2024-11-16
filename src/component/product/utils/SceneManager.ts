// src/three/core/SceneManager.ts
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class SceneManager {
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public renderer: THREE.WebGLRenderer
  public controls: OrbitControls

  constructor(container: HTMLDivElement) {
    const { clientWidth: width, clientHeight: height } = container

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#4a4a4a')

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(width, height)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.setupControls()

    if (!container.querySelector('canvas')) {
      container.appendChild(this.renderer.domElement)
    }
  }

  private setupControls() {
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.screenSpacePanning = false
    this.controls.maxPolarAngle = Math.PI / 2
  }

  public addToScene(object: THREE.Object3D) {
    this.scene.add(object)
  }

  public removeFromScene(object: THREE.Object3D) {
    this.scene.remove(object)
  }

  public setCameraPosition(gender: string) {
    if (gender === '남자') {
      this.camera.position.set(0, 3, 25)
    } else {
      this.camera.position.set(0, 3, 10)
    }
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  public animate() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  public handleResize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  public dispose() {
    this.controls.dispose()
    this.renderer.dispose()
  }
}
