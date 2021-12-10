<template>
  <div class="content">
    <center>
      <img width="250" src="/static/logo.jpg" class="centerv">
    </center>
    <form @submit.prevent="login">
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
      this.logs = ""
      axios.post(this.url+"/login/", 
        {"username": this.username, "password":this.password}
      ).then((response) => {
        this.$store.state.user = response.data
        this.$store.state.notification = {
          type:"success", message:"Bienvenue"
        }
      }).catch((error) => {
        this.logs = error.response.data
      })
    }
  }
};
</script>

<style scoped>

.content{
  background-color: white;
  width: 500px;
  margin: 100px auto;
  padding: 10px;
  border: 2px solid var(--primary);
}
h1{
  text-align: center;
}
img{
  max-width: 200px;
}
button{
  width: 100%;
  margin: 10px 0;
  height: 35px;
}
.content{
  display: flex;
  box-shadow: 3px 3px 10px var(--primary);
  border-radius: 5px;
}
form{
  margin-left: 15px;
  width: 300px;
}
center{
  position: relative;
}
.centerv{
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
@media only screen and (max-width: 510px) {
  .content{
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
  form{
    width: 100%;
    margin-left: 0;
  }
  .centerv{
    top: 0;
    transform: translate(0, 0);
  }
}
</style>