//import { useState } from 'react';
import './App.css'

// import components
import Nav from './components/nav';
import FuelInput from './components/fuelInput';
import FuelHistory from './components/fuelHistory';

function App() {
  
  return (
    <>
      <Nav />
      <FuelInput />
      <FuelHistory />
    </>
  )
}

export default App
