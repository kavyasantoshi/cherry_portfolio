import About from "../components/about/About.jsx";
import Menu from "../components/menu/Menu.jsx";
import Contact from "../components/contact/Contact.jsx";
import Slider from "../components/home/Slider.jsx";
function Home() {
  return (
    <>
    <Slider/>
    <About/>
    <Menu/>
    <Contact/>
    </>
  );
}
export default Home;
