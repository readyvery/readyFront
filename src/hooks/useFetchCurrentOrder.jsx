import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchCurrentOrder = (orderId, refreshKey) => {
  // const [cancels, setCancels] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  // const [inout, setInout] = useState(1);
  // const [name, setName] = useState("");
  // const [orderName, setOrderName] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/current?orderId=${orderId}`,
          { withCredentials: true }
        );
        // setCancels(response.data.cancels);
        setEstimatedTime(response.data.estimatedTime);
        // setInout(response.data.inout);
        // setName(response.data.name);
        // setOrderName(response.data.orderName);
        setOrderNum(response.data.orderNum);
        setProgress(response.data.progress);
      } catch (error) {
        console.error("Error fetching current order status:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, refreshKey]); // refreshKey를 의존성 배열에 추가

  return { estimatedTime, orderNum, progress };
};

export default useFetchCurrentOrder;
