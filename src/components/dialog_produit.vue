<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="close">&times</button>
      <center>
        <h3>Produit</h3>
      </center>
      <form method="post">
        <div class="field">
          <label for="nom">Nom du produit</label>
          <input type="text" id="nom" v-model="nom" autocomplete="off">
        </div>
        <div class="field">
          <label for="unite_entrante">Unité entrante</label>
          <input type="text" id="unite_entrante" v-model="unite_entrante">
        </div>
        <div class="field">
          <label for="unite">Unité sortante</label>
          <input type="text" id="unite" v-model="unite">
        </div>
        <div class="field">
          <label for="rapport">Rapport</label>
          <input type="number" id="rapport" v-model="rapport">
        </div>
        <div class="field">
          <label for="prix_vente">Prix de vente</label>
          <input type="number" id="prix_vente" v-model="prix_vente">
        </div>
        <div class="field">
          <label for="indications">Indications</label>
          <textarea id="indications" v-model="indications"></textarea>
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
  },
  data(){
    return {
      nom: "", unite_entrante: "", unite: "",
      rapport: 1, indications: "", prix_vente: 0
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.nom = new_val.nom
        this.unite_entrante = new_val.unite_entrante
        this.unite = new_val.unite
        this.rapport = new_val.rapport
        this.indications = new_val.indications
        this.prix_vente = new_val.prix_vente
      }
    },
    unite_entrante(new_val){
      this.unite = new_val
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
        nom:this.nom, unite_entrante:this.unite_entrante,
        unite:this.unite, rapport:this.rapport, indications:this.indications,
        prix_vente:this.prix_vente, kiosk:this.getActiveKiosk().id
      }
      if(!this.item){
        axios.post(this.url+"/produit/", data, this.headers)
        .then((response) => {
          this.$store.state.produits.push(response.data)
          this.$emit("close")
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postProduit)
        });
      } else {
        axios.put(this.url+`/produit/${this.item.id}/`, data, this.headers)
        .then((response) => {
          let new_val = response.data
          this.item.nom = new_val.nom
          this.item.unite_entrante = new_val.unite_entrante
          this.item.unite = new_val.unite
          this.item.rapport = new_val.rapport
          this.item.indications = new_val.indications
          this.item.prix_vente = new_val.prix_vente
          this.$emit("close")
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postProduit)
        });
      }
    },
    close(){
      this.nom = ""
      this.unite_entrante = ""
      this.unite = ""
      this.rapport = ""
      this.indications = ""
      this.prix_vente = ""
      this.$emit("close")
    }
  }
};
</script>
<style scoped>
</style>