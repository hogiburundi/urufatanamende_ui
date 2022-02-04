<template>
  <div class="body">
    <div class="logged-in" v-if="!!active_user">
      <Menus/>
      <div class="right">
        <KioskChooser :active="must_choose_kiosk"/>
        <TopBar/>
        <router-view/>
      </div>
      <Notifier/>
    </div>
    <LoginForm v-else/>
  </div>
</template>
<script>
import LoginForm from "./components/login_form"
import Menus from "./components/menus"
import TopBar from "./components/topbar"
import Notifier from "./components/notifier"
import KioskChooser from "./components/kiosk_chooser"

export default {
  components: {
  	LoginForm, Menus, TopBar, Notifier, KioskChooser
  },
  computed:{
    must_choose_kiosk(){
      return !!this.active_user.kiosks &&
             this.active_user.kiosks.length>1 &&
             !this.$store.state.active_kiosk
    }
  },
  watch:{
    "$store.state.user":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem('user', JSON.stringify(new_val));
        } else {
          localStorage.removeItem('user')
        }
      }
    },
    "$store.state.active_kiosk"(new_val){
      if(!!new_val){
        localStorage.setItem('active_kiosk', JSON.stringify(new_val));
      } else {
        localStorage.removeItem('active_kiosk')
      }
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));
    if (user) {
      this.$store.state.user = user;
    }
    if(active_kiosk) {
      this.$store.state.active_kiosk = active_kiosk;
    }
  }
};
</script>
<style src="./style.css">
</style>
