import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import FirstPage from './pages/firstPage';
import SecondPage from './pages/secondPage';
import Pageandrana from './pages/thirsPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/a" element={<Pageandrana />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
