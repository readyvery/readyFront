import axios from "axios";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


commonApis.interceptors.request.use(
    async (config) => {
        const loginStateValue = localStorage.getItem('accessToken');
        console.log('commonApi: ', loginStateValue);
        if (loginStateValue) {
            config.headers['Authorization'] = `Bearer ${loginStateValue}`;
        } 
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

commonApis.interceptors.response.use(
    (res) => { return res },
    async (err) => {
        const {
            config,
            response,
        } = err;
        console.log(err);
        // access token 만료 시
        
        const loginStateValue = localStorage.getItem('accessToken');
        // console.log('commonApi: ', loginStateValue);
        // console.log(response);

        // if(!loginStateValue){
        //     // 로그인 안 되어 있는 경우
        //     setIsAuth(true);
        // }
        try{
            if (response?.status === 403 && loginStateValue) {
            console.log("로그인 O, 403");
            const res = await axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${loginStateValue}`
                }
            })
                console.log(res);
                localStorage.clear();
                    // removeCookie("accessToken");
                    // axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
                    // config.headers.common["Authorization"] = "Bearer " + accessToken;
                return axios(config);
            }
        } catch (e) {
            if (e?.response?.status === 401 || e?.response?.status === 403){
                // 로그인 페이지로 이동
                console.log(e);
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
            return config;
        }
        return Promise.reject(err);
    }
)

export default commonApis;
