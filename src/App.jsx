import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect,useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/layout/header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./components/about/About";
import Menu from "./components/menu/Menu";
import "./pages/Home.css";
import "./index.css";
import Contact from "./components/contact/Contact";
import Playstore from "./components/app/Playstore";
import ScratchCampaign from './pages/ScratchCampaign';
// import "./script.js";
// import "./script1.js";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
    <Header/>
     <main className="page-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scratch-and-win" element={<ScratchCampaign />} />
        <Route path="/cherries-app" element={<Playstore/>} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>

  );
}
export default App;
