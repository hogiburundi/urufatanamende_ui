<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="close">&times</button>
      <center>
        <h3>Stock</h3>
      </center>
      <form method="post">
        <div class="field">
          <label for="quantite">Quantite initiale:</label>
          <input type="text" id="quantite" v-model="quantite">
        </div>
        <div class="field">
          <label for="prix_total">Prix total:</label>
          <input type="number" id="prix_total" v-model="prix_total" min="0">
        </div>
        <div class="field">
          <label for="date_expiration">Date d'expiration:</label>
          <input type="date" id="date_expiration" v-model="date_expiration">
        </div>
        <div class="buttons">
          <button type="reset">Reset</button>
          <button type="submit" value="Vendre" @click.stop.prevent="postProduit">Soumettre</button>
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
      quantite:0, date_expiration:"", prix_total:0
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.quantite = new_val.quantite
        this.date_expiration = new_val.date_expiration
        this.prix_total = new_val.prix_total
      }
    }
  },
  methods: {
    postProduit(){
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
        quantite:this.quantite,
        date_expiration:this.date_expiration,
        prix_total:this.prix_total,
        produit:this.produit,
      }
      if(!this.item){
        axios.post(this.url+"/produit/", data, this.headers)
        .then((response) => {
          this.$store.state.produits.push(response.data)
          this.$emit("close")
        }).catch((error) => {
          this.displaErrorOrRefreshToken(error, this.postProduit)
        });
      } else {
        axios.put(this.url+`/produit/${this.item.id}/`, data, this.headers)
        .then((response) => {
          let new_val = response.data
          for(let key of Object.keys(new_val)){
            this.item[key] = new_val[key]  
          }
          this.$emit("close")
        }).catch((error) => {
          this.displaErrorOrRefreshToken(error, this.postProduit)
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