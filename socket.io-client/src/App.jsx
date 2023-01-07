import { useState } from 'react'
import './App.css'
import Socket from "./components/socketIO"

function App() {

  return (
    <div className="App">
      <h1>Socket IO</h1>
      <Socket/>
    </div>
  )
}

export default App
