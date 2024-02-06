import "./StoreList.css";
import { IMAGES } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

const StoreList = ({ stores }) => {
  const navigate = useNavigate();

  return (
    <div className="store_list">
      {stores.map((item) => (
        <div
          className="store_list_item"
          onClick={() => navigate(`/packagingStatus?storeId=${item.idx}`)}
        >
          <img
            src={item.imgUrl}
            alt="veryPickimg"
            className="store_list_cafe_img"
          />
          {!item.status && (
            <img
              src={IMAGES.cafeClose}
              alt="closedImage"
              className="store_list_cafe_close"
            />
          )}
          <div className="store_list_cafe_name">{item.name}</div>
          <div className="store_list_cafe_address">{item.address}</div>
          <div className="store_list_cafe_event">
            <img
              src={IMAGES.cafeEvent}
              alt="eventTextIcon"
              className="store_list_cafe_event_icon"
            />
            {item.eventMessage}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
