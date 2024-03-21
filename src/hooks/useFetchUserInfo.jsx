import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import commonApis from "../utils/commonApis";

const apiUrl = `/user/info`;

const useFetchUserInfo = () => {
  const token = localStorage.getItem("accessToken");
  const [cookies, , ] = useCookies(["accessToken"]);
  // const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(token, cookies);
      if(token || cookies?.accessToken){
        try {
          const response = await commonApis.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token ? token : cookies?.accessToken}`
            }
        });
          setEmail(response.data.email);
          setName(response.data.name);
          setPhone(response.data.phone);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        console.log('fetching user info is diabled')
        return null;
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { email, name, phone };
};

export default useFetchUserInfo;
