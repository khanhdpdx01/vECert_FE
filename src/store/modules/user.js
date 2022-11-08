import UserService from '../../services/UserService'
const service = new UserService();

const state = {
    isLogin: false,
    users: [],
    role: null,
    username: null,
    page: {
        totalPages: 0,
        totalItems: 0,
        currentPage: 0
    }
}

const mutations = {
    SET_IS_LOGIN(state, isLogin) {
        state.isLogin = isLogin;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_PAGE(state, page) {
        state.page = page;
    },
    SET_ROLE(state, roleName) {
        state.role = roleName;
    },
    SET_USERNAME(state, username) {
        state.username = username;
    }
}

const actions = {
    async login({commit}, info) {
        try {
            const res = await service.login(info);
            if(res.status === 200 && res.data) {
                commit('SET_IS_LOGIN', true);
                commit('SET_ROLE', res.data.role);
                commit('SET_USERNAME', res.data.username);
            }
        } catch (err) {
            commit('SET_IS_LOGIN', false);
        }
    },
    async getAllUsers({commit}, params) {
        const res = await service.getAllUsers(params);
        if(res.status === 200) {
            commit('SET_USERS', res.data.data);
            commit('SET_PAGE', {
                totalPages: res.data.totalPages,
                totalItems: res.data.totalItems,
                currentPage: res.data.currentPage
            })
        }
    }
}

const getters = {
    hasLogin: (state) => state.isLogin,
    getUsers: (state) => state.users,
    getPage: (state) => state.page,
    getRole: (state) => state.role,
    getUsername: (state) => state.username,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}