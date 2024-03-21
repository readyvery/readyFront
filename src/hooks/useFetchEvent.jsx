import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchEvent = (storeId) => {
  const [eventImgUrl, setEventImgUrl] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await commonApis.get(
          `/store/${storeId}/event`, 
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
