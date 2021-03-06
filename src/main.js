import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faShoppingCart, faBox, faBoxOpen, faChartBar, faUser, faBars,
  faSortDown, faExclamationTriangle, faTachometerAlt, faBell, faQrcode,
  faLongArrowAltRight, faMoneyBillAlt, faDatabase, faSmileWink,
  faSearch, faTimes, faPlus, faList, faBalanceScale, faTrashAlt,
  faFileInvoice, faDownload, faUpload, faFolderOpen, faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'

library.add({
  faShoppingCart, faBox, faBoxOpen,  faChartBar, faUser, faBars,
  faSortDown, faExclamationTriangle, faTachometerAlt, faBell, faQrcode,
  faLongArrowAltRight, faMoneyBillAlt, faDatabase, faSmileWink,
  faSearch, faTimes, faPlus, faList, faBalanceScale, faTrashAlt,
  faFileInvoice, faDownload, faUpload, faFolderOpen, faHandHoldingUsd
})

Vue.component('fa', FontAwesomeIcon)

window.axios = axios;

Vue.mixin({
  methods: {
    isNumeric(x) {
      let str = x.toString();
      if (str.match(/^[0-9]+$/)) return true;
      return false;
    },
    logOut(x) {
      if(confirm("Voulez-vous vraiment deconnecter?")){
        this.$store.state.user = null
        this.$store.state.active_kiosk = null
      }
    },
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += `- ${key}: ${value}. `
            }
            valeur = child;
          }
          string+=`${clef}: ${valeur}. `
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    getGroupName(id){
      let group = this.$store.state.groups.find(x => x.id == id)
      return !!group? group.name:"-";
    },
    getGroupId(name){
      let group = this.$store.state.groups.find(x => {
        return x.name.toLowerCase() == name.toLowerCase()
      })
      return !!group? group.id:-1;
    },
    userIs(personnel, group_id){
      let groups = personnel.user.groups;
      return groups.includes(group_id);
    },
    datetime(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short', timeStyle: 'short' }
      ).format(date)
    },
    displayErrorOrRefreshToken(error, callback){
      if(!!error.response){
        if(error.response.data.code == "token_not_valid"){ 
          let refresh = this.$store.state.user.refresh
          if(!refresh){
            this.$store.state.user = null;
            return
          }
          axios.post(this.url+"/refresh/", {"refresh":refresh})
          .then((response) => {
            this.$store.state.user.access = response.data.access
            if(typeof callback == "function") callback()
          }).catch((error) => {
            this.$store.state.user = null;
            console.error(error)
            this.$store.state.alert = {
              type:"danger", message:this.cleanString(error.response.data)
            }
          })
        } else {
          this.$store.state.alert = {
            type:"danger", message:this.cleanString(error.response.data)
          }
        }
      }
    },
    displayErrorOrRefreshOBR(error, callback, elseCallback){
      if(!!error.response){
        if(error.response.status == 403){ 
          let username = this.$store.state.user.username
          let password = this.$store.state.user.password
          if(!username || !password){
            this.$store.state.user = null;
            return
          }
          let data = {
            "username": username,
            "password": password
          }
          axios.post(this.url+"/login/", JSON.stringify(data))
          .then((response) => {
            this.$store.state.user["access"] = response.data.result.token
            callback()
          }).catch((error) => {
            this.$store.state.user = null;
            console.error(error)
          })
        } else {
          this.$store.state.alert = {
            type:"danger", message:this.cleanString(error.response.data.msg)
          }
          if(typeof(elseCallback) == 'function'){
            elseCallback()
          }
        }
      } else {
        console.error(error)
      }
    },
    getActiveKiosk(){
      if(!this.$store.state.active_kiosk){
        if(!!this.active_user.kiosks && this.active_user.kiosks.length == 1){
          this.$store.state.active_kiosk = this.active_user.kiosks[0]
        }
      }
      return this.$store.state.active_kiosk
    }
  },
  computed:{
    active_user(){
      return this.$store.state.user;
    },
    active_user_fullname(){
      return `${this.active_user.first_name} ${this.active_user.last_name}`;
    },
    user_is_owner(){
      return !!this.getActiveKiosk() && this.active_user.owned.includes(this.getActiveKiosk().id)
    },
    base_url(){
      return this.$store.state.base_url;
    },
    url(){
      return this.base_url + this.$store.state.api;
    },
    obr_headers(){
      return {
        headers:{
          "Authorization":"Bearer "+this.$store.state.user.obr_access,
          "Content-Type":"application/json, text/plain"
        }
      }
    },
    obr_url(){
      return this.$store.state.url
    },
    headers(){
      return {
        headers:{
          "Authorization":"Bearer "+this.$store.state.user.access
        }
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
