import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ReadyPage.css";

import Header from "../../components/views/Header/Header";
import StateBox from "../../components/views/StateBox/StateBox";

import empty from "../../assets/images/storage_empty.svg";

function ReadyPage() {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [storageList, setStorageList] = useState([]);

  useEffect(() => {
    const config = {
      withCredentials: true
    };

    axios.get(`${apiUrl}/api/v1/order/history/fast`, config)
      .then((res) => {
        console.log(res);
        setStorageList(res.data.receipts);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <section className="main-container">
      <Header
        headerProps={{ pageName: "바로주문", isClose: false, linkTo: "/" }}
      />
      <main className="content-container">
        {storageList.length ? (
          storageList.map((e, i) => (
            <Link
              to={`/payment?storeId=${e?.storeId}&inout=${e?.inOut}&cartId=${e?.cartId}`}
              state={{ returnTo: "/ready" }}
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
                state={3}
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

export default ReadyPage;
