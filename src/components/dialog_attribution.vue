<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="close">&times</button>
      <center>
        <h3>Attribution</h3>
      </center>
      <form method="post">
        <div style="margin-bottom: 0;">Utilisateur:</div>
        <div class="searchable" style="margin-top: 0;">
          <input type="text" id="keyword" placeholder="keyword" v-model="keyword">
          <button @click.prevent="search">search</button>
        </div>
        <div class="logs">
          {{ logs }}
        </div>
        <div class="field" v-if="user_is_owner">
          <label for="role">Rôle</label>
          <select id="role" v-model="role">
            <option v-for="r in $store.state.roles" :value="r" :selected="role==r?'on':'off'">
              {{ r.toUpperCase() }}
            </option>
          </select>
        </div>
        <div class="buttons">
          <button type="reset">Reset</button>
          <button type="submit" value="Vendre" @click.prevent="postAttrib">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    active:{ type:Boolean, default:false},
  },
  data(){
    return {
      logs:"", keyword:"", user:null, role:""
    }
  },
  methods: {
    search(){
      if(!this.keyword){
        this.logs = "* le champ est obligatoire"
        return
      }
      this.logs = "recherche en cours ..."
      axios.get(this.url+`/user/?search=${this.keyword}`, this.headers)
      .then((response) => {
        let results = response.data.results
        if(results.length == 0){
          this.logs = "aucun utilisateur trouvé"
        } else if(results.length > 1){
          this.logs = "le resultat est flou"
        } else {
          this.logs = `${results[0].first_name} ${results[0].last_name}`
          this.user = results[0]
        }
      }).catch((error) => {
        this.logs = this.cleanString(error.response.data)
      });
    },
    postAttrib(){
      let data = {user: this.user.id, name: this.role}
      let kiosk = this.getActiveKiosk().id
      axios.post(this.url+`/kiosk/${kiosk}/attribuer/`, data, this.headers)
      .then((response) => {
        this.$store.state.attributions.push(response.data)
        this.$emit("close")
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postAttrib)
      });
    },
    close(){
      this.$emit("close")
    }
  }
};
</script>
<style scoped>
</style>