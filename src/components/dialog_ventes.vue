<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close nonprintable" @click="$emit('close')">
        &times
      </button>
      <center class="nonprintable">
        <h3 style="margin-bottom: 10px;">PRODUITS VENDUES</h3>
      </center>
      <Invoice :commande="fetched"/>
      <center class="nonprintable">
        <button @click="imprimer">
          imprimer
        </button>
      </center>
    </div>
  </div>
</template>
<script>
import Invoice from "./invoice"
export default {
  components:{Invoice},
  props: {
    active:{ type:Boolean, default:false},
    commande:{ type:Object, default:null},
  },
  data(){
    return {
      details:null, fetched:null
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
      this.commande.ventes = null
      this.$emit("close")
    },
    fetchData(){
      axios.get(`${this.url}/commande/${this.commande.id}/`, this.headers)
      .then((response) => {
        this.fetched = response.data
        console.log("ventes updated")
      }).catch((error) => {
        this.displaErrorOrRefreshToken(error, this.fetchData)
      });
    },
    imprimer(){
      window.print()
    }
  }
};
</script>
<style scoped>
</style>