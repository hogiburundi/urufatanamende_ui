import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    base_url: "http://127.0.0.1:8000",
    api: "/api",
    notification:{type:"", message:"Bienvenue"},
    notifs:[],
    active_kiosk:null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
