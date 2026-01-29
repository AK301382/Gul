import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import About from './pages/About';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blog" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;