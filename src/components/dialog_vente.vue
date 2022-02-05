<template>
  <div :class="['popup', 'nonprintable', {'active':active}]">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3>Paiement</h3>
      </center>
      <form method="post">
        <div>
          La somme à payer <b>{{money(cart.getTotal()) }}</b>Fbu
        </div>
        <div class="field">
          <label for="id_somme">La somme payée:</label>
          <input type="number" id="id_somme" v-model="payee" step="100">
        </div>
        <div>
          La somme 
          <span v-if="payee >= cart.getTotal()">à lui retourner</span>
          <b v-else>restante</b>
          est de: <b>{{ money(Math.abs(payee - cart.getTotal())) }}</b> Fbu
        </div>
        <hr>
        <div>
          <input type="checkbox" id="is_client_new" v-model="is_client_new">
          <label for="is_client_new"> C'est un nouveau client:</label>
        </div>
        <div class="field" v-if="!is_client_new">
          <label for="keyword">Nom du client:</label>
          <div class="searchable">
            <input type="text" id="keyword" placeholder="keyword" v-model="keyword">
            <button @click.prevent="search">search</button>
          </div>
          <div class="logs">
            {{ logs }}
          </div>
        </div>
        <div v-if="is_client_new">
          <div class="field">
            <label for="id_nom">Nom du client</label>
            <input type="text" list="noms" v-model="client.nom"
              id="id_nom" @change="setTel">
          </div>
          <div class="field">
            <label for="id_tel">Téléphone</label>
            <input type="number" v-model="client.tel" id="id_tel"
               list="tels" @change="setNom">
          </div>
        </div>
        <div class="buttons">
          <button type="submit" value="Vendre"
            @click.prevent="postCommande">Soumettre</button>
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
      client:{ nom:"", tel:""}, cart: this.$store.state.cart,
      dette_p:null, logs:"", is_client_new:false, keyword:""
    }
  },
  watch:{
    active(new_val){
      if(new_val){
        this.$store.state.commande = null;
      }
    }
  },
  computed:{
    payee:{
      get(){
        return this.dette_p == null ? this.cart.getTotal() : this.dette_p
      },
      set(val){
        this.dette_p = val
      }
    },
    clients(){
      return this.$store.state.clients
    },
    host(){
      return this.$store.state.url
    },
    username(){
      return this.$store.state.user.username
    }
  },
  mounted(){
  },
  methods: {
    close(){
      this.$emit("close")
    },
    setTel(){
      for(let client of this.clients){
        if (client.nom == this.client.nom) {
          this.client.tel = client.tel;
          return;
        }
      }
    },
    setNom(){
      for(let client of this.clients){
        if (client.tel == this.client.tel) {
          this.client.nom = client.nom;
          return;
        }
      }
    },
    search(){
      if(!this.keyword){
        this.logs = "* le champ est obligatoire"
        return
      }
      this.logs = "recherche en cours ..."
      axios.get(this.url+`/client/?search=${this.keyword}`, this.headers)
      .then((response) => {
        let results = response.data.results
        if(results.length == 0){
          this.logs = "aucun client trouvé"
        } else if(results.length > 1){
          this.logs = "le resultat est flou"
        } else {
          console.log('OK')
          this.logs = `${results[0].nom} : ${results[0].tel}`
          this.client = results[0]
        }
      }).catch((error) => {
        this.logs = this.cleanString(error.response.data)
      });
    },
    postCommande(){
      if(this.payee < this.cart.getTotal()){
        if(this.client.tel.length<7){
          this.$store.state.alert = {
            type:"danger", message:"le numero de telephone est obligatoire pour les dettes"
          }
          return;
        }
      }
      let data = {};
      let items = [];
      let client;
      if(!!this.client.nom){
        client = {"nom":this.client.nom, "tel":this.client.tel}
      }

      for(let item of this.cart.content){
        items.unshift({"produit":item.product.id, "quantite":item.quantite})
      }
      let payee = this.payee<=this.cart.getTotal()?this.payee:this.cart.getTotal()
      data = {
        "ventes":items, "payee":payee,
        "kiosk":this.getActiveKiosk().id,
        "client": client
      };
      if(data.ventes.length==0){
        this.$store.state.alert = {
          type:"danger", message:"le panier est vide"
        }
        return;
      }
      axios.post(this.url+"/commande/", data, this.headers)
      .then((response) => {
        this.$store.state.commande = response.data;
        this.$store.state.commandes.unshift(response.data);
        for(let item of this.cart.content){
          item.product.quantite -= item.quantite
        }
        this.cart.content = []
        setTimeout(print, 100)
        this.close()
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postCommande)
      });
    },
  }
};
</script>
<style scoped>
</style>