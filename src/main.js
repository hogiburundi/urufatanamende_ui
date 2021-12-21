import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faShoppingCart, faBox, faBoxOpen, faChartBar, faUser, faBars,
  faSortDown, faExclamationTriangle, faTachometerAlt, faBell,
  faLongArrowAltRight, faMoneyBillAlt, faDatabase, faSmileWink,
  faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons'

library.add({
  faShoppingCart, faBox, faBoxOpen,  faChartBar, faUser, faBars,
  faSortDown, faExclamationTriangle, faTachometerAlt, faBell,
  faLongArrowAltRight, faMoneyBillAlt, faDatabase, faSmileWink,
  faSearch, faTimes
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
        this.$store.state.user=null
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
              child += `- ${key}: ${value}<br>`
            }
            valeur = child;
          }
          string+=`${clef}: ${valeur}<br>`
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
    displaErrorOrRefreshToken(error, callback){
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
            if (!!error.response && error.response.status == 401) {
              this.$store.state.user = null;
            } else {
              console.error(error)
            }
          })
        } else {
          this.$store.state.notification = {
            type:"danger", message:this.cleanString(error.response.data)
          }
        }
      }
    },
    getActiveKiosk(){
      if(!this.$store.state.active_kiosk){
        if(!!this.active_user.kiosks && this.active_user.kiosks.length>0){
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
    active_user_is_responsable(){
      return this.active_user.is_admin || this.active_user.groups.includes('responsable');
    },
    base_url(){
      return this.$store.state.base_url;
    },
    url(){
      return this.base_url + this.$store.state.api;
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
