import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchFoodOptionInfo = (storeId, foodieId, inout) => {
  const [category, setCategory] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/${storeId}?foody_id=${foodieId}&inout=${inout}`,
          { withCredentials: true }
        );
        setCategory(response.data?.category);
        setImgUrl(response.data?.imgUrl);
        setName(response.data?.name);
        setPrice(response.data?.price);
      } catch (error) {
        console.error("Error fetching food option info:", error);
      }
    };
    fetchData();
  }, [storeId, foodieId, inout]);

  return { category, imgUrl, name, price };
};

export default useFetchFoodOptionInfo;
