import { IMAGES } from "../../constants/images";
import "./Splash.css";

const Splash = () => {
  return (
    <div className="splash">
      <img src={IMAGES.berryWhite} alt="berry" className="splash_logo" />
    </div>
  );
};

export default Splash;
