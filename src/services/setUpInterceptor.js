import http from './index';

const subPath = process.env.VUE_APP_SUB_PATH;

const setup = (router, cookies, localStorage) => {
    http.interceptors.response.use(
        (res) => {
            return res;
        }, 
        async (err) => {
            if(err.response?.status === 401) {
                router.push({ path: `${subPath}` }).catch(()=>{});
                cookies.remove("access_token");
                localStorage.removeItem("vuex");
                // router.go();
            }
            
            return Promise.reject(err);
        }
    )
};

export default setup;
