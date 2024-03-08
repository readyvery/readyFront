import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/board/search`;

const useFetchSearch = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    commonApis
      .get(apiUrl)
      .then((response) => {
        setStores(response.data.stores);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stores;
};

export default useFetchSearch;
