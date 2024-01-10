import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/berry.png";
import cancleLogo from "../../../assets/images/icon_cancleLogo.png";
import clock from "../../../assets/images/icon_clock.svg";
import close from "../../../assets/images/icon_close.svg";
import refresh from "../../../assets/images/icon_refresh.svg";
import Modal from "../../views/Modal/Modal";
import "./OrderStatus.css";
import moment from "moment/moment";
import Progressbar from "../ProgressBar/ProgressBar";
import useFetchCurrentOrder from "../../../hooks/useFetchCurrentOrder";
import useCancelOrder from "../../../hooks/useCancelOrder";

function OrderStatus() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const [degree, setDegree] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { cancels, estimatedTime, inout, name, orderName, orderNum, progress } =
    useFetchCurrentOrder(orderId, refreshKey);
  const cancelOrder = useCancelOrder();

  const progressList = useMemo(
    () => ({
      ORDER: 0,
      MAKE: 1,
      COMPLETE: 2,
      PICKUP: 3,
      CANCEL: 4,
    }),
    []
  );

  useEffect(() => {
    if (progress) {
      const currentProgress = progressList[progress];
      setDegree(currentProgress);
    }
  }, [progress, progressList]);

  // 주문 상태 새로고침 함수
  const refreshOrderStatus = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleCancel = async () => {
    try {
      await cancelOrder(orderId); // 주문 취소 요청
      setDegree(progressList.CANCEL); // 취소 상태로 UI 업데이트
    } catch (error) {
      console.error("주문 취소 중 오류 발생:", error);
      // 오류 처리 로직 (선택적)
    } finally {
      setIsOpen(false); // 성공, 실패, 예외에 관계없이 모달 닫기
    }
  };

  return (
    <section className="status-container">
      <div className="status-nav-bar__wrapper">
        {degree === 4 ? (
          <div className="status-nav-bar">
            <div></div>
            <Link to="/status" style={{ textDecoration: "none" }}>
              <img src={close} className="close-btn" alt={close} />
            </Link>
          </div>
        ) : (
          <div className="status-nav-bar">
            <Link to="/status" style={{ textDecoration: "none" }}>
              <img src={close} className="close-btn" alt={close} />
            </Link>
            <img
              src={refresh}
              className="refresh-btn"
              alt={refresh}
              onClick={refreshOrderStatus}
            />
          </div>
        )}
        {degree === 1 && (
          <div className="status-time-wrapper">
            <div className="status-time">
              <div className="status-time-img__wrapper">
                <img src={clock} alt={clock} />
              </div>
              <span>
                <span style={{ color: "#D82356" }}>
                  {moment(estimatedTime, "HH:mm:ss.SSS").diff(
                    moment(),
                    "minutes"
                  ) < 0
                    ? 0
                    : moment(estimatedTime, "HH:mm:ss.SSS").diff(
                        moment(),
                        "minutes"
                      )}
                  분 후
                </span>
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
        ) : degree === 4 ? (
          <div className="status-top-wrapper" style={{ height: "25vh" }}>
            <div className="status-number-wrapper">
              <div className="logo-img-wrapper center">
                <img src={cancleLogo} className="logo-img" alt={cancleLogo} />
              </div>
              <span className="status-number">주문 취소</span>
            </div>
            <div className="progressbar-wrapper">
              <div></div>
              {/* <Progressbar degree={degree} /> */}
            </div>
          </div>
        ) : (
          <div className="status-top-wrapper">
            <div className="status-number-wrapper">
              <div className="logo-img-wrapper center">
                <img src={logo} className="logo-img" alt={logo} />
              </div>
              <span className="status-number">{orderNum}번</span>
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
              <span className="status-content">{name}</span>
            </div>
            <div className="status-content-wrapper">
              <span className="status-content-subtitle">주문내역</span>
              <div className="status-content">
                <span className="status-history">{orderName}</span>
              </div>
            </div>
            <div className="status-content-wrapper">
              <span className="status-content-subtitle">수령방식</span>
              <div className="status-content">
                <span className="status-history">
                  {inout === 1 ? "매장" : "픽업"}
                </span>
              </div>
            </div>
            {degree === 4 && (
              <div className="status-content-wrapper">
                <span className="status-content-subtitle">취소사유</span>
                <span className="status-content">
                  {cancels?.split(",")[1]?.split("=")[1]}
                </span>
              </div>
            )}
            <div className="status-detail__wrapper">
              <Link
                to={`/orderDetail?orderId=${orderId}`}
                state={{ returnTo: `/status?orderId=${orderId}` }}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <div className="status-detail">주문상세</div>
              </Link>
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
            <Link to="/status" style={{ textDecoration: "none" }}>
              <div className="compelete-btn">확인</div>
            </Link>
          </div>
        )}
      </div>

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleCancle={handleCancel}
          title={"주문을 취소하시겠습니까?"}
          subtitle={"확인 버튼을 누르시면, 주문이 취소됩니다."}
        />
      )}
    </section>
  );
}

export default OrderStatus;
