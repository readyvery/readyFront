import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/berry.png";
// import berry from "../../../assets/images/berry.svg";
import { useNavigate } from "react-router-dom";
import clock from "../../../assets/images/icon_clock.svg";
import close from "../../../assets/images/icon_close.svg";
import refresh from "../../../assets/images/icon_refresh.svg";
import Modal from "../../views/Modal/Modal";
import "./OrderStatus.css";

import moment from "moment/moment";
import Progressbar from "../ProgressBar/ProgressBar";

function OrderStatus() {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const [degree, setDegree] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [statusList, setStatusList] = useState({});
  const navigate = useNavigate();

  const progressList = {
    ORDER: 0,
    MAKE: 1,
    COMPLETE: 2,
    PICKUP: 3,
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/order/current?orderId=${orderId}`, config)
      .then((res) => {
        console.log(res);
        setStatusList(res.data);
        const curPro = res.data.progress;
        console.log(progressList[curPro]);
        setDegree(progressList[curPro]);
      })
      .catch((err) => console.log(err));
  };

  const refreshDegree = () => {
    fetchData();
  };

  const handleCancle = () => {
    setIsOpen((prev) => !prev);
    const config = {
      withCredentials: true,
    };
    const body = {
      orderId: orderId,
    };

    navigate("/");

    axios
      .post(`${apiUrl}/api/v1/order/toss/cancel`, body, config)
      .then((res) => console.log(res));
  };

  return (
    <section className="status-container">
      <div className="status-nav-bar__wrapper">
        <div className="status-nav-bar">
          <Link to="/orderHistory" style={{ textDecoration: "none" }}>
            <img src={close} className="close-btn" alt={close} />
          </Link>
          <img
            src={refresh}
            className="refresh-btn"
            alt={refresh}
            onClick={refreshDegree}
          />
        </div>
        {degree !== 0 && (
          <div className="status-time-wrapper">
            <div className="status-time">
              <div className="status-time-img__wrapper">
                <img src={clock} alt={clock} />
              </div>
              <span>
                <span style={{ color: "#D82356" }}>
                  {Math.abs(
                    moment(statusList?.estimatedTime, "HH:mm:ss.SSS").diff(
                      moment(),
                      "minutes"
                    )
                  )}
                  분 후
                </span>{" "}
                수령 가능!
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="status-main-wrapper">
        {degree === 0 ? (
          <div className="status-top-wrapper space">
            <div className="status-title-wrapper">
              <div className="logo-img-wrapper">
                <img src={logo} className="logo-img" alt={logo} />
              </div>
              <span className="status-title">주문 요청 중 ...</span>
            </div>
            <div className="progressbar-wrapper">
              <Progressbar degree={degree} />
            </div>
          </div>
        ) : (
          <div className="status-top-wrapper">
            <div className="status-number-wrapper">
              <div className="logo-img-wrapper center">
                <img src={logo} className="logo-img" alt={logo} />
              </div>
              <span className="status-number">{statusList?.orderNum}번</span>
            </div>
            <div className="progressbar-wrapper">
              <Progressbar degree={degree} />
            </div>
          </div>
        )}
        {degree !== 3 && (
          <div className="status-content-container">
            <div className="status-content-wrapper">
              <span className="status-content-subtitle">주문매장</span>
              <span className="status-content">{statusList?.name}</span>
            </div>
            <div className="status-content-wrapper">
              <span className="status-content-subtitle">주문내역</span>
              <div className="status-content">
                <span className="status-history">{statusList?.orderName}</span>
                <div className="status-detail">
                  <Link
                    to={`/orderDetail?orderId=${orderId}`}
                    state={{ returnTo: `/orderHistory?orderId=${orderId}` }}
                    style={{ textDecoration: "none" }}
                  >
                    주문상세
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {degree === 0 && (
          <div className="btn-wrapper">
            <div
              className="cancle-btn"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              주문 취소
            </div>
          </div>
        )}

        {degree === 3 && (
          <div className="compelete-wrapper">
            <div className="compelete-img">
              <span className="compelete-text">"소중한 주문"</span>
              <span className="compelete-text">감사합니다!</span>
            </div>
            <Link to="/orderHistory" style={{ textDecoration: "none" }}>
              <div className="compelete-btn">확인</div>
            </Link>
          </div>
        )}
      </div>

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleCancle={handleCancle}
          title={"주문을 취소하시겠습니까?"}
          subtitle={"확인 버튼을 누르시면, 주문이 취소됩니다."}
        />
      )}
    </section>
  );
}

export default OrderStatus;
