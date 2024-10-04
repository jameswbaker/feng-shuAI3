import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const RoomWithFurniture = (roomDimensions) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer

    // container that holds all the 3D objects (meshes, lights, etc.) and cameras
    const scene = new THREE.Scene();

    const width = window.innerWidth / 2 - 6;
    const height = window.innerHeight;

    const fov = 75;
    const aspectRatio = width / height;
    const nearClip = 0.1;
    const farClip = 1000;
    // viewpoint from which the scene is rendered
    const camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearClip, farClip);    // PerspectiveCamera is used to mimic human vision
    // WebGL renderer that draws the scene and camera view to the HTML <canvas>
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // set the renderer size based on the window’s width and height
    renderer.setSize(width, height);
    // Attaches the canvas element created by the renderer to the React component's div reference
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth motion
    controls.dampingFactor = 0.05; // How smooth motion should be
    controls.enableZoom = true;
    controls.enablePan = true;
    
    // Set initial camera position
    camera.position.set(0, 2, 12);

    // Room Floor
    // Creates a 10x10 plane to serve as the floor of the room.
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    // Defines the material of the floor as a plain color (gray here: 0x808080)
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x909090, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // Rotates the floor so it lies flat on the XZ plane
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Room Walls (front, back, left, right)
    const wallMaterialB = new THREE.MeshBasicMaterial({ color: 0x858585 });
    const wallMaterialF = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const wallMaterialL = new THREE.MeshBasicMaterial({ color: 0x757575 });
    const wallMaterialR = new THREE.MeshBasicMaterial({ color: 0x707070 });
    
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterialB);
    backWall.position.set(0, 2.5, -5);
    scene.add(backWall);

    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterialF);
    frontWall.position.set(0, 2.5, 5);
    frontWall.rotation.y = Math.PI;
    scene.add(frontWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterialL);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-5, 2.5, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterialR);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(5, 2.5, 0);
    scene.add(rightWall);

    // Ceiling
    const ceiling = new THREE.Mesh(floorGeometry, wallMaterialB);
    ceiling.position.set(0, 5, 0);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // // Furniture (Table)
    // const tableGeometry = new THREE.BoxGeometry(2, 0.1, 2); // Table top
    // const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    // const tableTop = new THREE.Mesh(tableGeometry, tableMaterial);
    // tableTop.position.set(0, 1, 0);
    // scene.add(tableTop);

    // // Table legs
    // const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1);
    // const legMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

    // const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    // leg1.position.set(-0.9, 0.5, -0.9);
    // scene.add(leg1);

    // const leg2 = leg1.clone();
    // leg2.position.set(0.9, 0.5, -0.9);
    // scene.add(leg2);

    // const leg3 = leg1.clone();
    // leg3.position.set(-0.9, 0.5, 0.9);
    // scene.add(leg3);

    // const leg4 = leg1.clone();
    // leg4.position.set(0.9, 0.5, 0.9);
    // scene.add(leg4);

    // // Furniture (Chair)
    // const chairSeatGeometry = new THREE.BoxGeometry(1, 0.1, 1);
    // const chairSeatMaterial = new THREE.MeshBasicMaterial({ color: 0x000080 });
    // const chairSeat = new THREE.Mesh(chairSeatGeometry, chairSeatMaterial);
    // chairSeat.position.set(0, 0.6, -2.5);
    // scene.add(chairSeat);

    // // Chair legs
    // const chairLegGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6);

    // const chairLeg = new THREE.Mesh(chairLegGeometry, legMaterial);
    // chairLeg.position.set(-0.45, 0.3, -2.05);
    // scene.add(chairLeg);

    // const chairLeg2 = chairLeg.clone();
    // chairLeg2.position.set(0.45, 0.3, -2.05);
    // scene.add(chairLeg2);

    // const chairLeg3 = chairLeg.clone();
    // chairLeg3.position.set(-0.45, 0.3, -2.95);
    // scene.add(chairLeg3);

    // const chairLeg4 = chairLeg.clone();
    // chairLeg4.position.set(0.45, 0.3, -2.95);
    // scene.add(chairLeg4);

    // // Chair back
    // const chairBackGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    // const chairBack = new THREE.Mesh(chairBackGeometry, chairSeatMaterial);
    // chairBack.position.set(0, 1.1, -3);
    // scene.add(chairBack);

    // Lighting
    // Provides soft, indirect light to the whole scene, ensuring that objects are visible even without direct light.
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Acts as a light source at a specific point (X = 2, Y = 5, Z = 5) that casts light in all directions.
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(2, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      // Sets up a loop that continuously renders the scene. It ensures smooth animation and re-renders the scene on every frame.
      requestAnimationFrame(animate);
      // Updates the OrbitControls to reflect any changes in camera movement (rotation, zoom, pan).
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      // Updates the renderer size.
      // Adjusts the camera’s aspect ratio to the new window dimensions.
      // Ensures the camera’s view is correctly updated.
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    // When the component is unmounted, it removes the canvas and the resize event listener to prevent memory leaks or unwanted behavior.
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default RoomWithFurniture;
