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
        <div class="logs">{{logs}}</div>
        <div class="buttons">
          <button type="submit" value="Vendre"
            @click.prevent="postCommande">Soumettre</button>
        </div>
      </form>
      <datalist id="noms">
        <option v-for="c in clients" :value="c.nom"/>
      </datalist>

      <datalist id="tels">
        <option v-for="c in clients" :value="c.tel"/>
      </datalist>
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
      dette_p:null, logs:""
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
    postCommande(){
      if(this.payee < this.cart.getTotal()){
        if(this.client.tel.length<7){
          this.$store.state.notification = {
            type:"danger", message:"le numero est obligatoire pour les dettes"
          }
          return;
        }
      }
      let data = {};
      let items = [];
      let client = `${this.client.nom} ${this.client.tel}`

      for(let item of this.cart.content){
        items.unshift({"produit":item.product.id, "quantite":item.quantite})
      }
      data = {
        "ventes":items, 
        "payee":this.payee,
        "kiosk":this.getActiveKiosk().id,
        "client": client.length>3?client:undefined
      };
      axios.post(this.url+"/commande/", data, this.headers)
      .then((response) => {
        this.$store.state.commande.infos = response.data;
        for(let item of this.cart.content){
          item.product.quantite -= item.quantite
        }
        this.cart.content = []
        setTimeout(print, 100)
        this.close()
      }).catch((error) => {
        this.displaErrorOrRefreshToken(error, this.postCommande)
      });
    },
  }
};
</script>
<style scoped>
</style>