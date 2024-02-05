import React from "react";
import { useLocation } from "react-router";
import "./OrderHistory.css";

import OrderProgress from "../../components/views/PageComponent/OrderProgress";
import OrderStorage from "../../components/views/PageComponent/OrderStorage";

function OrderHistory() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params?.get("orderId");

  return <>{orderId === null ? <OrderStorage /> : <OrderProgress />}</>;
}

export default OrderHistory;
