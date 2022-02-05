<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="close">&times</button>
      <center>
        <h3>Attribution</h3>
      </center>
      <form method="post">
          <label for="keyword">Nom du client:</label>
          <div class="searchable">
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
          <button type="submit" value="Vendre" @click.stop.prevent="postStock">Soumettre</button>
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
    item:{ type:Object, default:null},
    produit:{ type:Object, default:null},
  },
  data(){
    return {
      quantite_actuelle:0, date_expiration:"", prix_total:0, quantite:0
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.quantite_actuelle = new_val.quantite_actuelle
        this.date_expiration = new_val.date_expiration
        this.prix_total = new_val.prix_total
      }
    },
    quantite(new_val){
      this.quantite_actuelle = new_val*this.produit.rapport
    }
  },
  methods: {
    postStock(){
      try {
        this.prix_vente = eval(this.prix_vente)
        this.rapport = eval(this.rapport)
      } catch(e) {
        this.$store.state.notification = {
          type:"danger", message:"le prix n'est evaluable"
        }
        return
      }
      let data = {
        quantite_actuelle:this.quantite_actuelle,
        date_expiration:!!this.date_expiration?this.date_expiration:undefined,
        prix_total:this.prix_total,
        produit:this.produit.id,
      }
      if(!this.item){
        axios.post(this.url+"/stock/", data, this.headers)
        .then((response) => {
          // if(this.produit.id == response.data.produit){
          // }
          this.$emit("close")
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postStock)
        });
      } else {
        axios.put(this.url+`/stock/${this.item.id}/`, data, this.headers)
        .then((response) => {
          let new_val = response.data
          for(let key of Object.keys(new_val)){
            this.item[key] = new_val[key]  
          }
          this.$emit("close")
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postStock)
        });
      }
    },
    close(){
      this.$emit("close")
    }
  }
};
</script>
<style scoped>
</style>