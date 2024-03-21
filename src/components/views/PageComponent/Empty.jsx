import { IMAGES } from "../../../constants/images";
import "./Empty.css";

const Empty = () => {
  return (
    <div className="empty_page">
      <img src={IMAGES.empty} alt="empty" />
      비어있습니다
    </div>
  );
};

export default Empty;
