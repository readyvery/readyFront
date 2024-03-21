import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchCurrentOrder = (orderId, refreshKey) => {
  // const [cancels, setCancels] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  // const [inout, setInout] = useState(1);
  // const [name, setName] = useState("");
  // const [orderName, setOrderName] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [progress, setProgress] = useState("");
  const [expectPoint, setExpectPoint] = useState(0);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(
          `/order/current?orderId=${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        // setCancels(response.data.cancels);
        setEstimatedTime(response.data.estimatedTime);
        // setInout(response.data.inout);
        // setName(response.data.name);
        // setOrderName(response.data.orderName);
        setOrderNum(response.data.orderNum);
        setProgress(response.data.progress);
        setExpectPoint(response.data.expectPoint);
      } catch (error) {
        console.error("Error fetching current order status:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, refreshKey]); // refreshKey를 의존성 배열에 추가

  return { estimatedTime, orderNum, progress, expectPoint };
};

export default useFetchCurrentOrder;
