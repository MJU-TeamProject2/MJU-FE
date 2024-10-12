import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ThreeJsModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loadingStatus, setLoadingStatus] = useState<string>('Loading...')
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
      1000,
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
    mtlLoader.load('/avatar.mtl',
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
            avatarObj.scale.set((weightScale / 70) * 5, (heightScale / 170) * 5, (weightScale / 70) * 5)

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
      },
    )

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.setSize(330, 400)
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
      avatar.scale.set((weightScale / 70) * 5, (heightScale / 170) * 5, (weightScale / 70) * 5) // Adjust weight (X,Z axis) and height (Y axis)
    }
  }, [heightScale, weightScale, avatar])

  return (
    <div style={{ display: 'flex', width: '30%', flexDirection: 'column', height: '100vh' }}>
      {/* 3D Model Section */}
      <div
        ref={mountRef}
        style={{ width: '30%', flexGrow: 1 }} // FlexGrow 1 ensures this div takes up the majority of the screen
      />

      {/* Control Panel Section (Sliders) */}
      <div style={{
        width: '100%', // Ensure the slider section is the same width as the 3D render area
        padding: '10px',
        backgroundColor: 'rgba(100, 100, 150, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        {/* Height slider */}
        <div style={{
          width: '300px',
          margin: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '10px',
          zIndex: 1
        }}>
          <label htmlFor="heightSlider">Adjust Height: {heightScale} cm</label>
          <input
            id="heightSlider"
            type="range"
            min="140"
            max="200"
            value={heightScale}
            onChange={(e) => setHeightScale(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* Weight slider */}
        <div style={{
          width: '300px',
          margin: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '10px',
          zIndex: 1
        }}>
          <label htmlFor="weightSlider">Adjust Weight: {weightScale} kg</label>
          <input
            id="weightSlider"
            type="range"
            min="40"
            max="100"
            value={weightScale}
            onChange={(e) => setWeightScale(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ThreeJsModelViewer
