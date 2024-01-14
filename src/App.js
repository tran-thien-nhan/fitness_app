import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Footer from './components/Footer';
import Fitness from './components/Fitness';
import ProjectileMotionCalculator from './components/ProjectileMotionCalculator';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/fitness-calculator">Home</Nav.Link>
              <Nav.Link as={Link} to="/fitness-calculator">Fitness Calculator</Nav.Link>
              <Nav.Link as={Link} to="/motion">Motion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/fitness-calculator" element={<Fitness />} />
          <Route path="/motion" element={<ProjectileMotionCalculator />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
