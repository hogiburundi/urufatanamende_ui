import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPen, faShoppingCart, faBox, faBoxOpen, faChartBar, faUser,
  faBars, faSortDown,
} from '@fortawesome/free-solid-svg-icons'

library.add({
  faPen, faShoppingCart, faBox, faBoxOpen,  faChartBar, faUser,
  faBars, faSortDown,
})

Vue.component('fa', FontAwesomeIcon)

window.axios = axios;

Vue.mixin({
  methods: {
    searchIn(field){
      this.act_col = field;
      this.search_type = "keyword";
    },
    filterIn(field){
      this.act_col = field;
      this.search_type = "date";
    },
    isNumeric(x) {
      let str = x.toString();
      if (str.match(/^[0-9]+$/)) return true;
      return false;
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
        if(error.response.status == 401){ 
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
    }
  },
  computed:{
    active_user(){
      return this.$store.state.user;
    },
    active_user_is_responsable(){
      return this.active_user.is_admin || this.active_user.groups.includes('responsable');
    },
    url(){
      return this.$store.state.url;
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
