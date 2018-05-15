import Vue from 'vue/dist/vue'
import Vuex from 'vuex/dist/vuex'
import project from './store/project'
import user from './store/user'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        project,
        user
    }
})  

export {store}