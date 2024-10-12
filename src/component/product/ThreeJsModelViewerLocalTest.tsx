import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ThreeJsModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loadingStatus, setLoadingStatus] = useState<string>('Loading...')

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0) // Light gray background
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

    // Helper axes
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // Model loading
    const mtlLoader = new MTLLoader()
    mtlLoader.load('/artist.mtl',
      (materials) => {
        materials.preload()
        setLoadingStatus('MTL loaded, loading OBJ...')

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
          '/artist.obj',
          (object) => {

            // Adjust model scale and position
            const box = new THREE.Box3().setFromObject(object)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 5 / maxDim // Scale to fit within a 5 unit cube
            object.scale.set(scale, scale, scale)

            const center = box.getCenter(new THREE.Vector3())
            object.position.sub(center)

            scene.add(object)

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

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '5px'
      }}>
        {loadingStatus}
      </div>
    </div>
  )
}

export default ThreeJsModelViewer