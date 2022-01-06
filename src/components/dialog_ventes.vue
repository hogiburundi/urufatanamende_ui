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
        <tbody>
          <tr v-for="i in 5">
            <td>{{ details.ventes[0].nom_produit }}</td>
            <td>{{ details.ventes[0].quantite }}</td>
            <td>{{ details.ventes[0].prix_unitaire }}</td>
            <td class="right">{{ details.ventes[0].prix_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3"></th>
            <th class="right">{{ details.prix }}</th>
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
      details :{
        prix:30000,
        ventes:[
          {"nom_produit":"umuti" ,"quantite":5 ,"prix_unitaire":1200 ,"prix_total":6000},
        ]
      }
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
      // axios.get(`${this.url}/commande/${this.commande.id}/`, this.headers)
      // .then((response) => {
      //   this.details = response.data
      // }).catch((error) => {
      //   this.displaErrorOrRefreshToken(error, this.fetchData)
      // });
    }
  }
};
</script>
<style scoped>
</style>