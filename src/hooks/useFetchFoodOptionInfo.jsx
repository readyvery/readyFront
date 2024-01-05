import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchFoodOptionInfo = (storeId, foodieId, inout) => {
  const [foodOptionInfo, setFoodOptionInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/${storeId}?foody_id=${foodieId}&inout=${inout}`,
          { withCredentials: true }
        );
        setFoodOptionInfo(response.data);
      } catch (error) {
        console.error("Error fetching food option info:", error);
      }
    };
    fetchData();
  }, [storeId, foodieId, inout]);

  return foodOptionInfo;
};

export default useFetchFoodOptionInfo;
