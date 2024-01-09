import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/user/info`;

const useFetchUserInfo = () => {
  // const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        setEmail(response.data.email);
        setName(response.data.name);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  return { email, name, phone };
};

export default useFetchUserInfo;
