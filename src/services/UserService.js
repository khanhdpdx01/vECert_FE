import http from './index';

class UserService {
    login(info) {
        return http.post('/auth/login', info);
    }
    
    getAllUsers(params) {
        return http.get('/admin', params);
    }

    createUser(newUser) {
        return http.post('/admin/register', newUser);
    }

    updateUser(existUser) {
        return http.post('/admin', existUser)
    }
}

export default UserService;