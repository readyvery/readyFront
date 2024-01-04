import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `${apiRoot}/api/v1/event/main`,
          config
        );
        setEvents(response.data.mainEvents);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchData();
  }, []);

  return events;
};

export default useFetchEvents;
