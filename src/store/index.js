import Vue from 'vue'
import Vuex from 'vuex'
import diploma from '../store/modules/diploma'
import user from '../store/modules/user'
import VuexPersist from 'vuex-persist';
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

const store = new Vuex.Store({
  modules: {
    diploma,
    user
  },
  plugins: [vuexLocalStorage.plugin]
});

export default store;
