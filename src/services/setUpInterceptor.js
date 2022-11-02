import http from './index';

const setup = (router, cookies, localStorage) => {
    http.interceptors.response.use(
        (res) => {
            return res;
        }, 
        async (err) => {
            if(err.response?.status === 401) {
                router.replace({ path: "/" })
                cookies.remove("access_token");
                localStorage.removeItem("vuex");
                router.go();
            }
            
            return Promise.reject(err);
        }
    )
};

export default setup;
