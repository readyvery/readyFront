import axios from "axios";
import { useState, useEffect } from "react";

const useFetchEvent = (storeId) => {
  const [event, setEvent] = useState(null);
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const version = "api/v1";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${version}/store/${storeId}/event`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [storeId]);

  return event;
};

export default useFetchEvent;
