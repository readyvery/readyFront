import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/event/main`;

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonApis.get(apiUrl);
        setEvents(response.data.mainEvents);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return events;
};

export default useFetchEvents;
