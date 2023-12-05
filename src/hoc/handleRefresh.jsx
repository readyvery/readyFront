import axios from "axios";
import moment from "moment";
import { useRecoilState } from "recoil";
import { loginState } from "../Atom/status";

const Refresh = async () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const expireAt = loginInfo.expiredTime;

  // 토큰이 만료되었다면

  if (moment(expireAt).diff(moment()) < 0) {
    const config = {
      withCredentials: true,
    };


    //재발급 요청
    const res = await axios.get(`${apiUrl}/api/v1/refresh/token`, config);
    setLoginInfo({
      expiredTime: moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss"),
    });
  }
};

const refreshErrorHandle = () => {
  //Cookie.remove("refreshToken");
};

export { Refresh, refreshErrorHandle };

