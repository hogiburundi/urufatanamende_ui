<template>
  <div class="content">
    <form @submit.prevent="login">
      <div class="img">
        <img width="80" src="/static/logo.png">
      </div>
      <h1>Bienvenue</h1>
      <div class="field">
        <label for="username">Nom d'utilisateur:</label>
        <input id="username" v-model="username" type="text" value="" autocomplete="off">
      </div>
      <div class="field">
        <label for="password">Mot de passe:</label>
        <input id="password" v-model="password" type="password" value="" autocomplete="off">
      </div>
      <div class="field">
        <label class="logs" v-html="cleanString(logs)"></label>
      </div>
      <button @click="login">Connexion</button>
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      username:"", password:"", logs:""
    }
  },
  methods:{
    login(){

      this.$store.state.user = {
        username:this.username,
      }
      // this.logs = ""
      // axios.post(this.url+"/login/", 
      //   {"username": this.username, "password":this.password}
      // ).then((response) => {
      //   this.$store.state.user = response.data
      //   this.$store.state.notification = {
      //     type:"success", message:"Bienvenue"
      //   }
      // }).catch((error) => {
      //   this.logs = error.response.data
      // })
    }
  }
};
</script>

<style scoped>
.content{
  background: rgb(41,49,80);
  background: radial-gradient(circle, rgba(41,49,80,1) 0%, rgba(5,157,187,1) 40%, rgba(5,157,187,1) 59%, rgba(41,49,80,1) 100%);
  height: 100%;
  padding-top: 100px;
}
.img{
  background-color: white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: auto;
  margin-top: -60px;
  border: 2px solid black;
}
.img img{
  margin: 10px;
}
form{
  border: 2px solid black;
  width: 300px;
  padding: 10px;
  margin: auto;
  background-color: #fff5;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
form input{
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
button{
  width: 100%;
  margin: 20px 0 10px 0;
}
h1{
  text-align: center;
  margin: 20px 0;
}
</style>