import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderStorage.css";

import Header from "../Header/Header";
import StateBox from "../StateBox/StateBox";

import empty from "../../../assets/images/storage_empty.svg";

function OrderStatus() {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [storageList, setStorageList] = useState([]);

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
              // to={e.state === 1 ? `/storage?orderId=${e.orderId}` : "/orderDetail"}
              to={`/orderHistory?orderId=${e.orderId}`}
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
                // state={e.state}
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

export default OrderStatus;
