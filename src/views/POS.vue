<template>
  <div class="pos">
    <center>
      <div class="sv">
        <fa icon="search"/>
        <input type="text" placeholder="search">
      </div>   
    </center>
    <div class="contents nonprintable">
      <div class="items" id="recycler">
        <VenteItem v-for="item in produits" :item="item" :key="item.id"/>
      </div>
      <CartView :cart="cart" v-if="details_shown"
        @close="switchDetails(false)"
        @submit="confirmVente"/>
      <div class="mini-cart" v-else @click="switchDetails(true)">
        panier ({{ cart.content.length }})
      </div>
    </div>
    <!-- <Invoice/>
    <DialogVente :active="confirm_vente" @close="confirm_vente=false"/> -->
  </div>
</template>
<script>
import VenteItem from "../components/vente_item"
import CartView from "../components/cart"
// import DialogVente from "../components/dialog_vente"
// import Invoice from "../components/invoice"
export default {
  components: {VenteItem, CartView},//, DialogVente, Invoice},
  data(){
    return{
      produits:this.$store.state.produits, confirm_vente:false,
      details_shown:true, next:null, to_search:""
    }
  },
  computed:{
    cart(){
      return this.$store.state.cart;
    }
  },
  watch:{
    "$store.state.produits"(new_val){
      this.produits = new_val
    },
    "$store.state.keywords"(new_val){
      this.search(JSON.parse(new_val))
    },
  },
  methods:{
    switchDetails(value){
      this.details_shown = value
      setTimeout(this.recalculateColumns, 100)
    },
    confirmVente(){
      this.$store.state.commande.ventes = this.$store.state.cart.content
      this.confirm_vente = true
    },
    fetchData(){
      let link = ""
      if(!this.next){
        link = this.url+"/produit/";
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.$store.state.produits.push(...response.data.results)
        if(response.data.next.length > 0){
          this.next = response.data.next
          this.fetchData()
        } else {
          this.next = null
        }
      }).catch((error) => {
        this.displaErrorOrRefreshToken(error, this.fetchData)
      });
    },
    search(keywords){
      this.produits = this.$store.state.produits
      this.produits = this.fuzzySearch(this.produits, keywords)
    },
    recalculateColumns(){
      console.log("recalculate columns")
      try {
        let width = recycler.clientWidth;
        let columns = Math.round(width/220)
        recycler.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
      } catch(e) {
        console.log(e);
      }
    },
  },
  mounted(){
    if(this.$store.state.produits.length<2){
      this.fetchData()
    }
    this.recalculateColumns()
    window.addEventListener("resize", this.recalculateColumns);
  },
  beforeRouteLeave(to, from, next){
    console.log("no longer tracking resize")
    window.removeEventListener("resize", this.recalculateColumns);
    next()
  }
}
</script>
<style scoped>
.pos{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.contents{
  display: flex;
  height: calc(100% - 100px);
  position: relative;
}
.items{
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  padding: 0 5px;
  height: 100%;
  overflow-y: scroll;
  align-items: start;
}
.mini-cart{
  position: absolute;
  right: -5px;
  background-color: var(--primary);
  color: white;
  font-weight: 700;
  padding: 5px 15px;
  box-shadow: -3px 3px 5px black;
  border-radius: 3px;
  cursor: default;
}
.sv{
  display: inline-flex;
  margin: 10px 0;
}
</style>
