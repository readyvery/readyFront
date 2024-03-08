import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/event/banner`;

const useFetchEventBanners = () => {
  const [eventBanners, setEventBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(apiUrl);
        setEventBanners(response.data.banners);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return eventBanners;
};

export default useFetchEventBanners;
