import "./Loader.css";
import logo from "/logos/cherry_logo.png";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={logo} alt="Logo" className="loader-logo" />
    </div>
  );
};

export default Loader;
