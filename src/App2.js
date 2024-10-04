import logo from './logo.svg';
import './App.css';

import RoomWithFurniture from './RoomWithFurniture2';

import { TextInput, Button, Slider } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core'

import { useState, useEffect } from 'react';

// const theme = createTheme({
//   colorScheme: 'light',
//   colors: {
//     deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
//     blue: ['#E9EDFC', '#C1CCF6', '#99ABF0']
//   },
//   shadows: {
//     md: '1px 1px 3px rgba(0, 0, 0, .25)',
//     xl: '5px 5px 3px rgba(0, 0, 0, .25)',
//   },
//   headings: {
//     fontFamily: 'Roboto, sans-serif',
//     sizes: {
//       h1: { fontSize: '2rem' },
//     },
//   },
// });

function App() {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [roomLength, setRoomLength] = useState('');

  const [roomDimensions, setRoomDimensions] = useState([]);


  // Current issue: not sure how to dynamically re-render the three JS scene

  useEffect(() => {
    setRoomDimensions([roomLength, roomWidth, roomHeight]);
  }, [roomWidth, roomHeight, roomLength]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div id="pageContainer">
        <h1>3D Room with Furniture</h1>
        <div className="dual">
          <div className="dual_container">
            <RoomWithFurniture roomDimensions={roomDimensions}/>
          </div>
          <div className="dual_container">
            <h2>Controls</h2>

            <div className="container">
              <h3>Room Dimensions</h3>
              <p>Enter in inches</p>
              
              <TextInput
                label="Length"
                placeholder="Enter room length"
                value={roomLength}
                onChange={(event) => setRoomLength(event.currentTarget.value)}
              />
              {/* <Slider 
                color="blue"
                marks={[
                  { value: 20, label: '20%' },
                  { value: 50, label: '50%' },
                  { value: 80, label: '80%' },
                ]}
                
                value={roomLength} 
                onChange={setRoomLength} 
                // onChangeEnd={setEndValue} 
              /> */}
              <TextInput
                label="Width"
                placeholder="Enter room width"
                value={roomWidth}
                onChange={(event) => setRoomWidth(event.currentTarget.value)}
              />
              <TextInput
                label="Height"
                placeholder="Enter room height"
                value={roomHeight}
                onChange={(event) => setRoomHeight(event.currentTarget.value)}
              />
            </div>

          </div>
        </div>
        
      </div>
    </MantineProvider>
  );
}

export default App;
