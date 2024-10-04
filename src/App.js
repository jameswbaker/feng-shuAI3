import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextInput, Button } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

import RoomWithFurniture from './RoomWithFurniture';

import logo from './logo.svg';
import './App.css';

// Main App component
function App() {
  const [roomWidth, setRoomWidth] = useState(11);
  const [roomHeight, setRoomHeight] = useState(9);
  const [roomLength, setRoomLength] = useState(12);
  const [roomDimensions, setRoomDimensions] = useState([roomLength, roomWidth, roomHeight]);

  const [objects, setObjects] = useState([]);
   // Callback function to update objects
   // Callback function to update objects
   const updateObjects = (newObject) => {
    // Prevent adding duplicates based on object reference
    setObjects((prevObjects) => {
        if (!prevObjects.includes(newObject)) {
            return [...prevObjects, newObject];
        }
        return prevObjects; // Return existing state if the object already exists
    });
};

  const Menu = () => (
    <div className="menu">
        <h3>Current Objects in Scene</h3>
        <ul>
                {objects.map((obj, index) => (
                    <li key={index}>{obj.name || `Object ${index + 1}`}</li>
                ))}
            </ul>
    </div>
    );

  // Update room dimensions whenever input changes
  useEffect(() => {
    setRoomDimensions([roomLength, roomWidth, roomHeight]);
  }, [roomLength, roomWidth, roomHeight]);

  // Increment and decrement functions
  const increment = (setter) => {
    setter((prev) => prev + 1);
  };

  const decrement = (setter) => {
    setter((prev) => Math.max(prev - 1, 0)); // Prevent negative values
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div id="pageContainer">
        <h1>Feng ShuAI</h1>
        <div className="dual">
          <div className="dual_container">
            <RoomWithFurniture roomDimensions={roomDimensions} updateObjects={updateObjects}/>
          </div>
          <div className="dual_container">
            <h2>Controls</h2>
            <div className="container">
              <h3>Room Dimensions</h3>
              <p>Enter in feet</p>
              <div>
                <label>Length:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => decrement(setRoomLength)}>-</Button>
                  <TextInput
                    value={roomLength}
                    readOnly // Make input read-only
                    style={{ width: '50px', margin: '0 5px' }}
                  />
                  <Button onClick={() => increment(setRoomLength)}>+</Button>
                </div>
              </div>
              <div>
                <label>Width:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => decrement(setRoomWidth)}>-</Button>
                  <TextInput
                    value={roomWidth}
                    readOnly
                    style={{ width: '50px', margin: '0 5px' }}
                  />
                  <Button onClick={() => increment(setRoomWidth)}>+</Button>
                </div>
              </div>
              <div>
                <label>Height:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => decrement(setRoomHeight)}>-</Button>
                  <TextInput
                    value={roomHeight}
                    readOnly
                    style={{ width: '50px', margin: '0 5px' }}
                  />
                  <Button onClick={() => increment(setRoomHeight)}>+</Button>
                </div>
              </div>
            </div>
            <div className="container">
              <h3>Object Dimensions</h3>
              <p>Enter in feet</p>
              <Menu></Menu>
            </div>
            
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
