<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3 style="margin-bottom: 10px;">PRODUITS VENDUES</h3>
      </center>
      <table>
        <thead>
          <tr>
            <th>produit</th>
            <th>quantité</th>
            <th>prix unitaire</th>
            <th class="right">prix total</th>
          </tr>
        </thead>
        <tbody v-if="!!details">
          <tr v-for="vente in details.ventes">
            <td>{{ vente.produit }}</td>
            <td>{{ vente.quantite }}</td>
            <td>{{ vente.prix_unitaire }}</td>
            <td class="right">{{ vente.prix_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3"></th>
            <th class="right">{{ !!details?details.prix:0 }}</th>
          </tr>
        </tfoot>
      </table>
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
      details:null
    }
  },
  watch:{
    active(new_val){
      if (new_val && !!this.commande) {
        this.fetchData()
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    fetchData(){
      axios.get(`${this.url}/commande/${this.commande.id}/`, this.headers)
      .then((response) => {
        this.details = response.data
      }).catch((error) => {
        this.displaErrorOrRefreshToken(error, this.fetchData)
      });
    }
  }
};
</script>
<style scoped>
</style>