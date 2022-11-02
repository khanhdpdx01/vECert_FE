import DiplomaService from '../../services/DiplomaService'
const service = new DiplomaService();

const state = {
    choiceFeild: {},
    diplomas: [],
    page: {
        totalPages: 0,
        totalItems: 0,
        currentPage: 0
    }
}

const mutations = {
    SET_CHOICE_FEILD(state, choiceFeild) {
        state.choiceFeild = choiceFeild;
    },
    SET_DIPLOMAS(state, diplomas) {
        state.diplomas = diplomas;
    },
    SET_PAGE(state, page) {
        state.page = page;
    }
}

const actions = {
    async getChoiceTrainningProgramFeild({commit}) {
        const res = await service.getChoiceTrainingProgramFeild();
        commit('SET_CHOICE_FEILD', res.data);
    },
    async getAllDiplomas({commit}) {
        const res = await service.getAllDiplomas();
        commit('SET_DIPLOMAS', res.data);
    },
    async getAllDiplomasWithPagination({commit}, params) {
        const res = await service.getAllDiplomasWithPagination(params);
        console.log(res);
        commit('SET_DIPLOMAS', res.data.data);
        commit('SET_PAGE', {
            totalPages: res.data.totalPages,
            totalItems: res.data.totalItems,
            currentPage: res.data.currentPage
        })
    },
    async searchDiploma({commit}, params) {
        const res = await service.searchDiploma(params);
        console.log(res.data);
        commit('SET_DIPLOMAS', res.data);
    },
    async getAllDiplomasHasPendingStatus({commit}, params) {
        const res = await service.getAllDiplomasHasPendingStatus(params);
        console.log(res);
        commit('SET_DIPLOMAS', res.data.data);
        commit('SET_PAGE', {
            totalPages: res.data.totalPages,
            totalItems: res.data.totalItems,
            currentPage: res.data.currentPage
        })
    }
}

const getters = {
    getChoiceFeild: (state) => state.choiceFeild,
    getDiplomas: (state) => state.diplomas,
    getPage: (state) => state.page,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}