import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/point`;

const useGetPoint = () => {
  const getPoint = async () => {
    try {
      const response = await axios.post(apiUrl, {
        withCredentials: true,
      });
        return response.data.point;
    } catch (error) {
      console.error(error);
    }
  };

  return getPoint;
};

export default useGetPoint;
