import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/board/search`;

const useFetchSearch = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl, { withCredentials: true })
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
