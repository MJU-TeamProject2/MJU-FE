import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ClothesItem, retrieveClothesDetail } from '@/api/clothesApi'

const buttonStyles = {
  padding: '8px 24px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
}

const selectedButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#2196F3',
  color: 'white',
  border: '1px solid #2196F3',
}

const ThreeJsModelViewer: React.FC<{ objId: string; mtlId: string }> = ({
                                                                          objId,
                                                                          mtlId,
                                                                        }) => {
  const [objClothesItem, setObjClothesItem] = useState<ClothesItem | null>(null)
  const [mtlClothesItem, setMtlClothesItem] = useState<ClothesItem | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  const [gender, setGender] = useState<'남자' | '여자' | null>(null)
  const [size, setSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | null>(null)
  const [height, setHeight] = useState<'150~' | '160~' | '170~' | '180~' | '190~' | null>(null)

  useEffect(() => {
    const fetchClothesItems = async () => {
      const [obj, mtl] = await Promise.all([
        retrieveClothesDetail(objId),
        retrieveClothesDetail(mtlId),
      ])
      setObjClothesItem(obj)
      setMtlClothesItem(mtl)
    }
    fetchClothesItems()
  }, [])

  useEffect(() => {
    if (!mountRef.current) return
    if (objClothesItem == null || mtlClothesItem == null) return

    const container = mountRef.current
    const renderWidth = container.clientWidth
    const renderHeight = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#333333')

    const camera = new THREE.PerspectiveCamera(
      75,
      renderWidth / renderHeight,
      0.1,
      1000,
    )

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    renderer.setSize(renderWidth, renderHeight)

    // 기존 canvas 제거
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    const mtlLoader = new MTLLoader()
    mtlLoader.load(mtlClothesItem.objectUrl, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        objClothesItem.objectUrl,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = materials.create('material0')
              child.material.color.setRGB(0.8, 0.1, 0.1)
              child.material.specular.setRGB(1.0, 0.9, 0.9)
              child.material.shininess = 100
            }
          })
          object.scale.set(0.1, 0.1, 0.1)
          object.position.set(0, 0, 0)
          object.rotation.y = (Math.PI / 180) * -25

          const box = new THREE.Box3().setFromObject(object)
          const center = box.getCenter(new THREE.Vector3())
          object.position.sub(center)

          scene.add(object)

          camera.position.set(0, 0, 0.3)
          camera.lookAt(new THREE.Vector3(0, 0, 0))
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.log('An error happened', error)
        },
      )
    })

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      controls.dispose()
    }
  }, [objClothesItem, mtlClothesItem])

  const SelectionButton = ({
                             selected,
                             onClick,
                             children
                           }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      style={selected ? selectedButtonStyles : buttonStyles}
    >
      {children}
    </button>
  )

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100vh'
    }}>
      <div
        ref={mountRef}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: '#333'
        }}
      />
      <div style={{
        width: '50%',
        height: '100%',
        padding: '40px',
        backgroundColor: '#fff'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>
          원하는 아바타를 피팅해보세요
        </h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '16px',
            marginBottom: '15px'
          }}>
            성별 선택
          </h3>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <SelectionButton
              selected={gender === '남자'}
              onClick={() => setGender('남자')}
            >
              남자
            </SelectionButton>
            <SelectionButton
              selected={gender === '여자'}
              onClick={() => setGender('여자')}
            >
              여자
            </SelectionButton>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '16px',
            marginBottom: '15px'
          }}>
            사이즈 선택
          </h3>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
              <SelectionButton
                key={s}
                selected={size === s}
                onClick={() => setSize(s as any)}
              >
                {s}
              </SelectionButton>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '16px',
            marginBottom: '15px'
          }}>
            모델키 선택
          </h3>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {['150~', '160~', '170~', '180~', '190~'].map((h) => (
              <SelectionButton
                key={h}
                selected={height === h}
                onClick={() => setHeight(h as any)}
              >
                {h}
              </SelectionButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeJsModelViewer