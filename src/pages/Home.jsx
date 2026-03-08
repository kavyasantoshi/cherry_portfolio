import About from "../components/about/About.jsx";
import Menu from "../components/menu/Menu.jsx";
import Contact from "../components/contact/Contact.jsx";
import Slider from "../components/home/Slider.jsx";
import Promo from "../components/Scratchpromosection/Scratchpromosection.jsx";
import Playstore from "../components/app/Playstore.jsx";
function Home() {
  return (
    <>
    <Slider/>
    <About/>
    <Menu/>
    <Promo />
    <Contact/>
    <Playstore />
    </>
  );
}
export default Home;
