import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect,useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import "./pages/Home.css";
import "./index.css";
import Contact from "./pages/Contact";
import Playstore from "./components/Playstore";
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
      </Routes>
      </main>
      <Playstore/>
      <Footer />
    </BrowserRouter>

  );
}
export default App;
