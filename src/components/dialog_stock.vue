<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="close">&times</button>
      <center>
        <h3>Stock</h3>
      </center>
      <form method="post">
        <div class="field">
          <label for="quantite_actuelle">Quantite:</label>
          <input type="number" id="quantite_actuelle" v-model="quantite_actuelle">
        </div>
        <div class="field">
          <label for="prix_total">Prix total:</label>
          <input type="number" id="prix_total" v-model="prix_total">
        </div>
        <div class="field">
          <label for="date_expiration">Date d'expiration:</label>
          <input type="date" id="date_expiration" v-model="date_expiration"
            :min="new Date().toISOString().split('T')[0]">
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
      quantite_actuelle:0, date_expiration:"", prix_total:0
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.quantite_actuelle = new_val.quantite_actuelle
        this.date_expiration = new_val.date_expiration
        this.prix_total = new_val.prix_total
      }
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
        date_expiration:this.date_expiration,
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
          this.displaErrorOrRefreshToken(error, this.postStock)
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
          this.displaErrorOrRefreshToken(error, this.postStock)
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