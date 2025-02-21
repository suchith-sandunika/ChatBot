import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Bot from './pages/Bot';

function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
        </Routes>

        <Routes>
          {/* Bot page Routes */}
          <Route path="/Bot" element={< Bot/>} />
        </Routes>
      </Router>
  );
}

export default App;
