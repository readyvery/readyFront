import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchStoreMenu = (storeId, inout) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(
          `/store/${storeId}/menu?inout=${inout}`
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
