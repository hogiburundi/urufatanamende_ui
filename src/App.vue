<template>
  <div class="body">
    <div class="logged-in" v-if="!!active_user">
      <Menus/>
      <div class="right">
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

export default {
  components: {
  	LoginForm, Menus, TopBar, Notifier
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
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.state.user = user;
    }
  }
};
</script>
<style src="./style.css">
</style>
