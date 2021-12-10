import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    // url: "/api",
    notification:{type:"", message:"Bienvenue"},
    url: "http://127.0.0.1:8000/api",
    // url: "/api",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
