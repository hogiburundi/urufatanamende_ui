<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3 style="margin-bottom: 10px;">PRODUITS VENDUES</h3>
      </center>
      <Invoice :commande="fetched"/>
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
    }
  }
};
</script>
<style scoped>
</style>