import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/board/store`;

const useFetchStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(apiUrl);
        setStores(response.data.stores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stores;
};

export default useFetchStores;
