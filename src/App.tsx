import Header from './components/Header';
import About from './components/About';
import Details from './components/Details';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Legal from './components/Legal';
import ExtendedGallery from './components/ExtendedGallery';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';

function MainContent() {
  return (
    <>
      <Navigation />
      <Header />
      <About />
      <Details />
      <Pricing />
      <Booking />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/galerie" element={<ExtendedGallery />} />
        <Route path="/rechtliches" element={<Legal />} />
      </Routes>
    </div>
  );
}

export default App;
