import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        // Scene, camera, and renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        // OBJ loading function
        const loadOBJ = (url, position) => {
            return new Promise((resolve, reject) => {
                const loader = new OBJLoader();
                loader.load(
                    url,
                    (object) => {
                        object.position.set(...position);
                        scene.add(object);
                        resolve(object);
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    (error) => {
                        console.error('An error happened', error);
                        reject(error);
                    }
                );
            });
        };

        // Load two OBJ files
        Promise.all([
            loadOBJ('/https://teamproject2-metaverse.s3.ap-northeast-2.amazonaws.com/test/dress.obj', [-1, 0, 0]), // Replace with actual OBJ file path
            loadOBJ('https://teamproject2-metaverse.s3.ap-northeast-2.amazonaws.com/test/tanktop.obj', [1, 0, 0])   // Replace with actual OBJ file path
        ]).then(() => {
            console.log('All objects loaded');
        }).catch((error) => {
            console.error('Error loading objects', error);
        });

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            currentRef.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default ThreeScene;