import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollGraph from './components/ScrollGraph';

function App() {
  return (
    <ThemeProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollGraph />
    </Layout>
    </ThemeProvider>
  );
}

export default App;