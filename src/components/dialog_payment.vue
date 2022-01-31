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
          <button type="submit" value="Vendre"@click.prevent="">Soumettre</button>
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
  }
};
</script>
<style scoped>
</style>