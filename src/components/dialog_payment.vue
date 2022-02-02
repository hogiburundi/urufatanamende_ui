<template>
  <div :class="['popup', 'nonprintable', {'active':active}]">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3>Paiement</h3>
      </center>
      <form method="post" v-if="!!commande">
        <div>
          Somme à payer : <b>{{ commande.prix - commande.payee }}</b>
        </div>
        <div class="field">
          <label for="id_somme">La somme payée:</label>
          <input type="number" id="id_somme" v-model="payee" step="100">
        </div>
        <div v-if="payee >= commande.prix - commande.payee">
          Somme à lui retourner : <b>{{ payee - (commande.prix - commande.payee) }}</b>
        </div>
        <div class="buttons">
          <button type="submit" @click.prevent="postPayment">Soumettre</button>
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
    commande:{ type:Object, default:null},
  },
  data(){
    return {
      payee:0
    }
  },
  watch:{
    commande(new_val){
      if(!!new_val){
        this.payee = this.commande.prix - this.commande.payee 
      }
    }
  },
  mounted(){
  },
  methods: {
    close(){
      this.$emit("close")
    },
    postPayment(){
      let to_post = this.commande.prix - this.commande.payee
      if(this.payee < to_post){
        to_post = this.payee
      }
      console.log
      let data = {
        "commande": this.commande.id,
        "montant": to_post,
        "details": ""
      }
      axios.post(this.url+`/payment/`, data, this.headers)
      .then((response) => {
        this.$store.state.payments.unshift(response.data)
        this.commande.payee += parseFloat(to_post)
        this.close()
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postPayment)
      });
    },
  }
};
</script>
<style scoped>
</style>