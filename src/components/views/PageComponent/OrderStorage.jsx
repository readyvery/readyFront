import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../constants/index.js";
import useFetchNewOrderHistory from "../../../hooks/useFetchNewOrderHistory";
import useFetchOldOrderHistory from "../../../hooks/useFetchOldOrderHistory";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import StateBox from "../StateBox/StateBox";
import Empty from "./Empty.jsx";
import Loading from "./Loading.jsx";
import "./OrderStorage.css";
function OrderStorage() {
  const navigate = useNavigate();
  const { newStorageList, isLoadingNewStorageList } = useFetchNewOrderHistory();
  const { oldStorageList, isLoadingOldStorageList } = useFetchOldOrderHistory();
  const handleNavigation = (e, orderId, progress) => {
    e.preventDefault(); // 기본 이벤트를 막습니다.

    const path =
      config.progressList[progress] === 0 ||
      config.progressList[progress] === 1 ||
      config.progressList[progress] === 2
        ? `/status?orderId=${orderId}`
        : `/orderDetail?orderId=${orderId}`;

    navigate(path, { state: { returnTo: "/status" } });
  };
  return (
    <section className="order_storage">
      <Header headerProps={{ pageName: "주문내역" }} />

      <main className="order_storage__container">
        {isLoadingNewStorageList && isLoadingOldStorageList ? (
          <div className="order_storage__empty">
            <Loading />
          </div>
        ) : newStorageList?.length || oldStorageList?.length ? (
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
                    state={config.progressList[e.progress]}
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
                    state={config.progressList[e.progress]}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          // newStorageList.length === 0 && oldStorageList.length === 0 ?
          <div className="order_storage__empty">
            <Empty />
          </div>
        )}
      </main>

      <NavBar />
    </section>
  );
}

export default OrderStorage;
