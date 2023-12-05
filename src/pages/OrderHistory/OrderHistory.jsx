import React from "react";
import { useLocation } from "react-router";
import "./OrderHistory.css";

import OrderStatus from "../../components/views/PageComponent/OrderStatus";
import OrderStorage from "../../components/views/PageComponent/OrderStorage";

function OrderHistory() {
  const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params?.get("orderId");

  return (
    <>
      {orderId === null ? <OrderStorage/> : <OrderStatus/>}
    </>
  );
}

export default OrderHistory;
