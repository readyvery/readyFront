import React from "react";
import { Link } from "react-router-dom";
import "./OrderStorage.css";
import useFetchNewOrderHistory from "../../../hooks/useFetchNewOrderHistory";
import useFetchOldOrderHistory from "../../../hooks/useFetchOldOrderHistory";

import Header from "../Header/Header";
import StateBox from "../StateBox/StateBox";

import empty from "../../../assets/images/storage_empty.svg";

function OrderStorage() {
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

  return (
    <section className="main-container">
      <Header
        headerProps={{ pageName: "주문내역", isClose: false, linkTo: "/" }}
      />
      <main className="content-container">
        {newStorageList?.length || oldStorageList?.length ? (
          <>
            {newStorageList?.length ? (
              newStorageList?.map((e, i) => (
                <Link
                  to={
                    progressList[e.progress] === 0 ||
                    progressList[e.progress] === 1 ||
                    progressList[e.progress] === 2
                      ? `/status?orderId=${e.orderId}`
                      : `/orderDetail?orderId=${e.orderId}`
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
                </Link>
              ))
            ) : (
              <></>
            )}
            {oldStorageList?.length ? (
              oldStorageList?.map((e, i) => (
                <Link
                  to={
                    progressList[e.progress] === 0 ||
                    progressList[e.progress] === 1 ||
                    progressList[e.progress] === 2
                      ? `/status?orderId=${e.orderId}`
                      : `/orderDetail?orderId=${e.orderId}`
                  }
                  state={{ returnTo: "/status" }}
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
                </Link>
              ))
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="empty-order-wrapper">
            <div className="empty-img-wrapper">
              <img src={empty} className="empty-img" alt={empty} />
            </div>
            <span className="empty-text">주문 내역이 없습니다</span>
          </div>
        )}
      </main>
    </section>
  );
}

export default OrderStorage;
