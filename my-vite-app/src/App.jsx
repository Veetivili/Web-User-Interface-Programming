import { useState } from 'react'
import './App.css'


function App() {
  const [message, setMessage] = useState('');

  const getMessage = async () => {
    const response = await fetch('/.netlify/functions/helloWorld');
    const data = await response.json();
    console.log(data);
    setMessage(data.message);
  }

  return (

    <>
      <button onClick={getMessage}>Click me</button>
      <p className='message-text'>{message}</p>
    </>
  )
}

export default App
