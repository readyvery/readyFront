import axios from "axios";
import { useState, useEffect } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchStoreMenu = (storeId, inout) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/store/${storeId}/menu?inout=${inout}`
        );
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching store menu:", error);
      }
    };
    fetchData();
  }, [storeId, inout]);

  return menu;
};

export default useFetchStoreMenu;
