import About from "../components/about/About.jsx";
import Menu from "../components/menu/Menu.jsx";
import Contact from "../components/contact/Contact.jsx";
import Slider from "../components/home/Slider.jsx";
import Playstore from "../components/app/Playstore.jsx";
import AppDownloadFloat from "../components/app/AppDownloadFloat.jsx";
import CateringTeaser from "../components/catering/CateringTeaser.jsx";

function Home() {
  return (
    <>
      <Slider />

      <About />
      <CateringTeaser />
      <Menu />
      <Contact />
      <Playstore />
      <AppDownloadFloat />
    </>
  );
}

export default Home;