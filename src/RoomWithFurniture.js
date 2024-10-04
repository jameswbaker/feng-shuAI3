import './App.css';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Suspense } from 'react';

import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


// RoomWithFurniture component
const RoomWithFurniture = ({ roomDimensions, updateObjects }) => {
    const [roomLength, roomWidth, roomHeight] = roomDimensions;
  
    // Table component scaled by 1.5x
    const Table = () => (
        <group position={[-3.5, 1.5, -3.5]}>
        {/* Tabletop */}
        <mesh position={[0, 0.075, 0]}>
            <boxGeometry args={[3, 0.15, 3]} />
            <meshStandardMaterial color="brown" />
        </mesh>
        {/* Table Legs */}
        {[[-1.35, -0.75, -1.35], [1.35, -0.75, -1.35], [-1.35, -0.75, 1.35], [1.35, -0.75, 1.35]].map((pos, idx) => (
            <mesh position={pos} key={idx}>
            <cylinderGeometry args={[0.075, 0.075, 1.5]} />
            <meshStandardMaterial color="brown" />
            </mesh>
        ))}
        </group>
    );
  
    // Chair component
    const Chair = () => (
      <group position={[2, 0.5, 0]}>
        {/* Chair seat */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        {/* Chair Legs */}
        {[[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5]].map((pos, idx) => (
          <mesh position={pos} key={idx}>
            <cylinderGeometry args={[0.05, 0.05, 0.5]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        ))}
      </group>
    );
  
    // Floor component
    const Floor = () => (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[roomLength, roomWidth]} />
        <meshStandardMaterial color="#B0B0B0" />
      </mesh>
    );
  
    // Walls component
    const Walls = () => {
      const wallPositions = [
        [0, roomHeight / 2, -roomWidth / 2], // Back wall
        [0, roomHeight / 2, roomWidth / 2],  // Front wall
        [-roomLength / 2, roomHeight / 2, 0], // Left wall
        [roomLength / 2, roomHeight / 2, 0],  // Right wall
      ];
  
      const wallRotations = [0, Math.PI, Math.PI / 2, -Math.PI / 2];
  
      return (
        <>
          <mesh position={wallPositions[0]} rotation-y={0} key={0}>
              <planeGeometry args={[roomLength, roomHeight]} />
              <meshStandardMaterial color="#858585" />
          </mesh>
          <mesh position={wallPositions[1]} rotation-y={-Math.PI} key={2}>
              <planeGeometry args={[roomLength, roomHeight]} />
              <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={wallPositions[2]} rotation-y={Math.PI / 2} key={1}>
              <planeGeometry args={[roomWidth, roomHeight]} />
              <meshStandardMaterial color="#757575" />
          </mesh>
          <mesh position={wallPositions[3]} rotation-y={-Math.PI / 2} key={3}>
              <planeGeometry args={[roomWidth, roomHeight]} />
              <meshStandardMaterial color="#707070" />
          </mesh>
        </>
      );
    };
  
    // Ceiling component
    const Ceiling = () => (
      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomLength, roomWidth]} />
        <meshStandardMaterial color="#B0B0B0" />
      </mesh>
    );

    const CustomObject = ({ path, side, scale, offset }) => {
        const obj = useLoader(OBJLoader, path);

        const scaled = [scale[0] / 4.5, scale[1] / 4.5, scale[2] / 4.5];
        const [x, y, z] = offset || [0, 0, 0];

         // After loading an object, update the parent component's state
         const objectInfo = { name: path.split('/').pop() }; // Extract the name from the path

         useEffect(() => {
          // Pass the object itself to updateObjects
          updateObjects(obj);
      }, [obj, updateObjects]);

        // case on side being b, f, l, r
        if (side === 'b') {
            return <primitive object={obj} position={[x + 0, y + 0, z + -roomWidth/2]} scale={scaled} />;
        } else if (side === 'f') {
            return <primitive object={obj} position={[x + 0, y + 0, z + roomWidth/2]} scale={scaled} />;
        } else if (side === 'l') {
            return <primitive object={obj} position={[x + -roomLength/2, y + 0, z + 0]} scale={scaled} />;
        } else if (side === 'r') {
            return <primitive object={obj} position={[x + roomLength/2, y + 0, z + 0]} scale={scaled} />;
        } else {
            return <primitive object={obj} position={[x + 0, y + 0, z + 0]} scale={scaled} rotation={[0, Math.PI, 0]} />;
        }
    };
  
    return (
        <>
      <Canvas style={{ width: '100%', height: '100vh' }}>
        <Suspense fallback={null}>
          {/* Ambient light for soft global illumination */}
          <ambientLight intensity={2.0} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          {/* Point light for localized illumination */}
          <pointLight position={[0, 2, 0]} intensity={1} />
          {/* Orbit controls for user interaction */}
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          {/* Floor, walls, ceiling, table, and chair */}
          <Floor />
          <Walls />
          <Ceiling />
          <Table />
          {/* <Chair /> */}

          <CustomObject path="/door.obj" side='r' scale={[1, 1, 1]}/>
          <CustomObject path="/window.obj" side='f' offset={[0, 3, 0]} scale={[0.01, 0.01, 0.01]}/>
          <CustomObject path="/bed.obj" scale={[11,11,11]} offset={[-3,0,2]} />
        </Suspense>
      </Canvas>
      </>
    );
  };

  export default RoomWithFurniture;