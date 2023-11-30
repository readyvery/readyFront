import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderStorage.css";

import Header from "../Header/Header";
import StateBox from "../StateBox/StateBox";

import empty from "../../../assets/images/storage_empty.svg";

function OrderStorage() {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [storageList, setStorageList] = useState([]);

  const progressList = {
    "ORDER": 0,
    "MAKE": 1,
    "COMPLETE": 2,
    "PICKUP": 3,
    "CANCEL": 4
  };

  useEffect(() => {
    const config = {
      withCredentials: true
    };

    axios.get(`${apiUrl}/api/v1/order/history`, config)
      .then((res) => {
        console.log(res);
        setStorageList(res.data.receipts);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const storageList = [];

  return (
    <section className="main-container">
      <Header
        headerProps={{ pageName: "주문내역", isClose: false, linkTo: "/" }}
      />
      <main className="content-container">
        {storageList.length ? (
          storageList.map((e, i) => (
            <Link
              to={progressList[e.progress] === 0 || progressList[e.progress] === 1 || progressList[e.progress] === 2 ? `/orderHistory?orderId=${e.orderId}` : `/orderDetail?orderId=${e.orderId}`}
              // to={`/orderHistory?orderId=${e.orderId}`}
              style={{ textDecoration: "none" }}
            >
              <StateBox
                id={e.orderId}
                date={e.dateTime}
                name={e.name}
                menu={e.orderName}
                imgUrl={e.imgUrl}
                amount={e.amount}
                isLast={storageList.length - 1 === i}
                state={progressList[e.progress]}
              />
            </Link>
          ))
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
