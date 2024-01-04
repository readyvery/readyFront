import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchEventBanners = () => {
  const [eventBanners, setEventBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/event/banner`, {
          withCredentials: true,
        });
        setEventBanners(response.data.banners);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return eventBanners;
};

export default useFetchEventBanners;
