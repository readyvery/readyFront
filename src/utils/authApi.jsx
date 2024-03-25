import axios from "axios";
import moment from "moment";

const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


authApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        const expiredTime = localStorage.getItem('expiredTime');

        // console.log('commonApi: ', token);
        if (token && moment(expiredTime).diff(moment()) <= 60000) {
            try{
                const res = await axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res);
                // localStorage.clear();
                // localStorage.setItem("accessToken", cookies.accessToken); // 로컬 스토리지에 AT 저장
                // localStorage.setItem("expiredTime", moment().add(1, "minutes").format("yyyy-MM-DD HH:mm:ss")); // 만료시간 저장
                // config.headers['Authorization'] = `Bearer ${cookies.accessToken}`;
                // removeCookie("accessToken");
            } catch (e) {
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    console.log(e);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("expiredTime");
                    window.location.href = "/login";
                }
            }
            return config;
        } 
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

authApi.interceptors.response.use(
    (res) => { return res },
    async (err) => {
        const {
            response,
        } = err;
        console.log(err);
        // access token 만료 시
        
        const loginStateValue = localStorage.getItem('accessToken');
        console.log('commonApi: ', loginStateValue);
        console.log(response);
        // window.location.href = "/login";

        // if(!loginStateValue){
        //     // 로그인 안 되어 있는 경우
        //     setIsAuth(true);
        // }
        // try{
        //     if (response?.status === 403 && loginStateValue) {
        //     console.log("로그인 O, 403");
        //     const res = await axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
        //         withCredentials: true,
        //         headers: {
        //             Authorization: `Bearer ${loginStateValue}`
        //         }
        //     })
        //         console.log(res);
        //         localStorage.clear();
        //             // removeCookie("accessToken");
        //             // axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
        //             // config.headers.common["Authorization"] = "Bearer " + accessToken;
        //         return axios(config);
        //     }
        // } catch (e) {
        //     if (e?.response?.status === 401 || e?.response?.status === 403){
        //         // 로그인 페이지로 이동
        //         console.log(e);
        //         localStorage.removeItem("accessToken");
        //         window.location.href = "/login";
        //     }
        //     return config;
        // }
        return Promise.reject(err);
    }
)

export default authApi;
