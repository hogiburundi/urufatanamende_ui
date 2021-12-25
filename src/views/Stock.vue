<template>
	<StatsLayout>
		<div class="import">
			<button>Generer un model</button>
			<button>Charger</button>
		</div>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>nom</th>
					<th>unités</th>
					<th>en stock</th>
					<th>sur etagère</th>
					<th class="right">prix de vente</th>
					<th class="right">Valeur Stock</th>
					<th class="right">Valeur Etagère</th>
					<th>
						<button @click="addProduct">Ajouter un produit</button>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="produit in produits">
					<td>{{ produit.id }}</td>
					<td>{{ produit.nom }}</td>
					<td>{{ `${produit.unite}(${produit.rapport} ${produit.unite_entrante})` }}</td>
					<td>Bouteilles</td>
					<td>Bouteilles</td>
					<td class="right">{{ money(produit.prix_vente) }}</td>
					<td class="right">{{ money(2800000)}}</td>
					<td class="right">{{ money(2800000)}}</td>
					<td>
						<button @click="editProduct({})">
							Modifier
						</button>
						<button>
							<fa icon="plus"/>
							Stock
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="6"></th>
					<th class="right">
						{{ money(2800000000)}}
					</th>
					<th class="right">
						{{ money(2800000000)}}
					</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
		</div>
		<DialogProduit :active="produit_shown" :item="active_product" @close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogProduit from "../components/dialog_produit"

export default{
	data(){
		return{
			produit_shown:false, active_product:null, next:null, produits:[]
		}
	},
	watch:{
		"$store.state.produits"(new_val){
			this.produits = new_val
		}
	},
	components:{ StatsLayout, DialogProduit },
	methods:{
		close(){
			this.produit_shown = false
			this.active_product = null
		},
		addProduct(){
			this.produit_shown = true
		},
		editProduct(product){
			this.produit_shown = true
			this.active_product = product
		},
    fetchData(){
      let link = ""
      if(!this.next){
        link = this.url+`/produit/`;
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
	},
	mounted(){
    if(this.$store.state.produits.length<1){
      this.fetchData()
    }
	}
};
</script>
<style scoped>
.import *{
	margin: 10px 10px 0 0;
}
.table{
  height: calc(100vh - 150px);
  max-width: 100%;
}
</style>