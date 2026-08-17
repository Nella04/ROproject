import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import FirstPage from './pages/firstPage';
import SecondPage from './pages/secondPage';
import Pageandrana from './pages/thirsPage';
import Rdp from './pages/rdp';

const exempleDonnees = {
        depots: ["1", "2", "3", "4", "5","6"],
        magasins: ["A", "B", "C", "D"],
        disponibilites: [18, 32, 14, 9],
        besoins: [9, 11, 28, 6, 14, 5],
        couts: [
            [24, 22, 61, 49, 83,35],
            [23, 39, 78, 28, 65,42],
            [67, 56, 92, 24, 53,54],
            [71, 43, 91, 67, 40,49],
        ]
    };

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/a" element={<Pageandrana exempleDonnees={exempleDonnees}/>} />
          <Route path="/rdp" element={<Rdp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
