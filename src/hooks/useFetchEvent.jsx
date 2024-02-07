import axios from "axios";
import { useState, useEffect } from "react";

const useFetchEvent = (storeId) => {
  const [eventImgUrl, setEventImgUrl] = useState("");
  // const [takeOutEvent, setTakeOutEvent] = useState("");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const version = "api/v1";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${version}/store/${storeId}/event`
        );
        setEventImgUrl(response.data.eventImgUrl);
        // setTakeOutEvent(response.data.takeOutEvent);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return eventImgUrl;
};

export default useFetchEvent;
