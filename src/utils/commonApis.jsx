import axios from "axios";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


commonApis.interceptors.request.use(
    async (config) => {
        const loginStateValue = localStorage.getItem('accessToken');
        // console.log('commonApi: ', loginStateValue);
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
    (err) => {
        const {
            config,
            response,
        } = err;
        console.log(err);
        // access token 만료 시
        if (response?.status && response?.status === 403) {
            window.location.href = "/login";
            localStorage.clear();
            return config;
        }
        return Promise.reject(err);
    }
)

export default commonApis;
