import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  ModelSection,
  ControlPanel,
  SliderContainer,
  SliderInput,
  SliderLabel,
  FittingContainer,
  ModelFrame,
  ControlSection,
} from '@/component/styles/products/modelStyles'

const ThreeJsModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [, setLoadingStatus] = useState<string>('Loading...')
  const [heightScale, setHeightScale] = useState<number>(170) // Default height
  const [weightScale, setWeightScale] = useState<number>(70) // Default weight
  const [avatar, setAvatar] = useState<THREE.Object3D | null>(null) // Store the avatar object

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000) // Background color set to black
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    // Model loading
    const mtlLoader = new MTLLoader()
    mtlLoader.load(
      '/avatar.mtl',
      (materials) => {
        materials.preload()
        setLoadingStatus('MTL loaded, loading OBJ...')

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
          '/avatar.obj',
          (object) => {
            // Assign object to avatar
            const avatarObj = object
            setAvatar(avatarObj) // Store avatar in state

            // Set initial avatar scale
            avatarObj.scale.set(
              (weightScale / 70) * 5,
              (heightScale / 170) * 5,
              (weightScale / 70) * 5
            )

            // Set avatar position
            avatarObj.position.set(0, -4, 0)

            // Add avatar to the scene
            scene.add(avatarObj)

            // Adjust camera position
            camera.position.set(5, 5, 5)
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            setLoadingStatus('Model loaded successfully')
          },
          (xhr) => {
            const percentComplete = (xhr.loaded / xhr.total) * 100
            setLoadingStatus(`Loading OBJ: ${percentComplete.toFixed(2)}%`)
          },
          (error) => {
            console.error('An error happened', error)
            setLoadingStatus('Error loading model')
          }
        )
      },
      (xhr) => {
        const percentComplete = (xhr.loaded / xhr.total) * 100
        setLoadingStatus(`Loading MTL: ${percentComplete.toFixed(2)}%`)
      },
      (error) => {
        console.error('An error happened', error)
        setLoadingStatus('Error loading materials')
      }
    )

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.setSize(600, 600)
      renderer.render(scene, camera)
    }
    animate()

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize, false)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose()
    }
  }, [])

  // Effect to update avatar scale when heightScale or weightScale changes
  useEffect(() => {
    if (avatar) {
      avatar.scale.set(
        (weightScale / 60) * 5,
        (heightScale / 170) * 5,
        (weightScale / 60) * 5
      ) // Adjust weight (X,Z axis) and height (Y axis)
    }
  }, [heightScale, weightScale, avatar])

  return (
    <FittingContainer>
      <ModelSection>
        <ModelFrame ref={mountRef} />
      </ModelSection>

      <ControlSection>
        <ControlPanel>
          <SliderContainer>
            <SliderLabel htmlFor="heightSlider">
              Height: {heightScale} cm
            </SliderLabel>
            <SliderInput
              id="heightSlider"
              type="range"
              min="140"
              max="200"
              value={heightScale}
              onChange={(e) => setHeightScale(Number(e.target.value))}
            />
          </SliderContainer>

          <SliderContainer>
            <SliderLabel htmlFor="weightSlider">
              Weight: {weightScale} kg
            </SliderLabel>
            <SliderInput
              id="weightSlider"
              type="range"
              min="40"
              max="100"
              value={weightScale}
              onChange={(e) => setWeightScale(Number(e.target.value))}
            />
          </SliderContainer>
        </ControlPanel>
      </ControlSection>
    </FittingContainer>
  )
}

export default ThreeJsModelViewer
