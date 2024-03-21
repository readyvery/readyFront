import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import commonApis from "../utils/commonApis";

const apiUrl = `/point/`;

const useGetPoint = () => {
  const token = localStorage.getItem("accessToken");
  const [cookies, , ] = useCookies(["accessToken"]);
  const [point, setPoint] = useState(0);
  useEffect(() => {
    const getPoint = async () => {
      if (token || cookies?.accessToken){
        try {
          const response = await commonApis.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token ? token : cookies?.accessToken}`
            }
          });
          const pointValue =
            response.data.point === null ? 0 : response.data.point;
          setPoint(pointValue);
        } catch (error) {
          console.error("Error fetching events data:", error);
        }
      } else {
        console.log('getting point is disabled');
        return null;
      }
    };

    getPoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return point;
};

export default useGetPoint;
