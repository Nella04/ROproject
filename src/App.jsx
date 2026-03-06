import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import FirstPage from './pages/firstPage';
import SecondPage from './pages/secondPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
