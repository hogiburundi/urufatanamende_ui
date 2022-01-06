import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    base_url: "http://127.0.0.1:8000",
    // base_url: "",
    api: "/api",
    notification:{type:"", message:"Bienvenue"},
    notifs:[],
    attributions:[],
    commandes:[],
    produits:[],
    stocks:[],
    alert:{type:"", message:"Bienvenue"},
    roles:["owner", "gerant", "vendeur"],
    active_kiosk:null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
