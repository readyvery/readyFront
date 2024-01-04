import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const StoreListApi = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiRoot}/api/v1/board/search`, config)
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

export default StoreListApi;
