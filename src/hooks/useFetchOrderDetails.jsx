import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchOrderDetails = (orderId) => {
  const [cancelReason, setCancelReason] = useState("");
  const [cart, setCart] = useState([]);
  const [inout, setInout] = useState(0);
  const [method, setMethod] = useState("");
  // const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [storePhone, setStorePhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/receipt?orderId=${orderId}`,
          { withCredentials: true }
        );
        setCancelReason(response.data.cancelReason);
        setCart(response.data.cart);
        setInout(response.data.inout);
        setMethod(response.data.method);
        // setOrderId(response.data.orderId);
        setOrderNumber(response.data.orderNumber);
        setOrderStatus(response.data.orderStatus);
        setOrderTime(response.data.orderTime);
        setSalePrice(response.data.salePrice);
        setStoreName(response.data.storeName);
        setStorePhone(response.data.storePhone);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  return {
    cancelReason,
    cart,
    inout,
    method,
    orderNumber,
    orderStatus,
    orderTime,
    salePrice,
    storeName,
    storePhone,
  };
};

export default useFetchOrderDetails;
