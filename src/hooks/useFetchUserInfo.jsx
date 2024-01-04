import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/user/info`, {
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
