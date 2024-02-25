import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/point/`;

const useGetPoint = () => {
  const [point, setPoint] = useState(0);
  useEffect(() => {
    const getPoint = async () => {
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setPoint(response.data.point);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    getPoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return point;
};

export default useGetPoint;
