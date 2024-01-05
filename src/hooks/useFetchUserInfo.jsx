import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/user/info`;

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        const { name, phone, email } = response.data;
        setUserInfo({ name, phone, email });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  return userInfo;
};

export default useFetchUserInfo;
