import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchFoodOptionInfo = (storeId, foodieId, inout) => {
  const [category, setCategory] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(
          `/order/${storeId}?foody_id=${foodieId}&inout=${inout}`
        );
        setCategory(response.data?.category);
        setImgUrl(response.data?.imgUrl);
        setName(response.data?.name);
        setPrice(response.data?.price);
        console.log("메뉴 데이터: ", response.data);
      } catch (error) {
        console.error("Error fetching food option info:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, foodieId, inout]);

  return { category, imgUrl, name, price };
};

export default useFetchFoodOptionInfo;
