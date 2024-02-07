import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderStorage.css";
import useFetchNewOrderHistory from "../../../hooks/useFetchNewOrderHistory";
import useFetchOldOrderHistory from "../../../hooks/useFetchOldOrderHistory";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import StateBox from "../StateBox/StateBox";
import { IMAGES } from "../../../constants/images";

function OrderStorage() {
  const navigate = useNavigate();
  const newStorageList = useFetchNewOrderHistory();
  const oldStorageList = useFetchOldOrderHistory();

  const progressList = {
    ORDER: 0,
    MAKE: 1,
    COMPLETE: 2,
    PICKUP: 3,
    CANCEL: 4,
    FAIL: 5,
  };

  const handleNavigation = (e, orderId, progress) => {
    e.preventDefault(); // 기본 이벤트를 막습니다.

    const path =
      progressList[progress] === 0 ||
      progressList[progress] === 1 ||
      progressList[progress] === 2
        ? `/status?orderId=${orderId}`
        : `/orderDetail?orderId=${orderId}`;

    navigate(path, { state: { returnTo: "/status" } });
  };

  return (
    <section className="order_storage">
      <Header
        headerProps={{ pageName: "주문내역", isClose: false, linkTo: "/" }}
      />

      <main className="order_storage__container">
        {newStorageList?.length || oldStorageList?.length ? (
          <div className="order_storage__list">
            {newStorageList?.length ? (
              newStorageList?.map((e, i) => (
                <div
                  onClick={(event) =>
                    handleNavigation(event, e.orderId, e.progress)
                  }
                  style={{ textDecoration: "none" }}
                >
                  <StateBox
                    id=""
                    date={e.dateTime}
                    name={e.name}
                    menu={e.orderName}
                    imgUrl={e.imgUrl}
                    amount={e.amount}
                    isLast={
                      oldStorageList?.length === 0 &&
                      newStorageList?.length - 1 === i
                    }
                    state={progressList[e.progress]}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
            {oldStorageList?.length ? (
              oldStorageList?.map((e, i) => (
                <div
                  onClick={(event) =>
                    handleNavigation(event, e.orderId, e.progress)
                  }
                  style={{ textDecoration: "none" }}
                >
                  <StateBox
                    id=""
                    date={e.dateTime}
                    name={e.name}
                    menu={e.orderName}
                    imgUrl={e.imgUrl}
                    amount={e.amount}
                    isLast={
                      oldStorageList?.length && oldStorageList?.length - 1 === i
                    }
                    state={progressList[e.progress]}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="empty-order-wrapper">
            <img src={IMAGES.empty} className="empty-img" alt="empty" />
            <span className="empty-text">비어있습니다</span>
          </div>
        )}
      </main>

      <NavBar />
    </section>
  );
}

export default OrderStorage;
