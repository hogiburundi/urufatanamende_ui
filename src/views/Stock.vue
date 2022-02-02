<template>
	<StatsLayout>
	<div class="table">
		<table>
			<tr>
				<th>qtt. initiale</th>
				<th>prix d'achat</th>
				<th>qtt. restant</th>
				<th>date d'exp.</th>
				<th>user</th>
				<th>validateur</th>
				<th>option</th>
			</tr>
			<tr v-if="progress">
				<td colspan="6">
					fetching...
				</td>
			</tr>
			<tr v-for="stock in stocks" v-else>
				<td>{{ `${stock.quantite_initiale} ${produit.unite}` }}</td>
				<td>{{ money(stock.prix_total) }}</td>
				<td><b>{{ `${stock.quantite_actuelle} ${produit.unite}` }}</b></td>
				<td>{{ stock.date_expiration || "-" }}</td>
				<td>{{ stock.user }}</td>
				<td>{{ stock.validated_by }}</td>
				<td v-if="!stock.validated_by">
					<button @click="valider(stock)">
						Valider
					</button>
					<button @click="supprimer(stock)">
						supprimer
					</button>
				</td>
				<td v-else>
					<button @click="perdre(stock)">
						perte
					</button>
				</td>
			</tr>
		</table>
	</div>
	<DialogPerte :active="perte_shown" :item="active_stock" @close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogPerte from "../components/dialog_perte"

export default{
	components:{ StatsLayout, DialogPerte },
	data(){
		return{
			produits:this.$store.state.produits, folded:-1, progress:false,
			active_product:null, next:null, stocks:[], active_stock:null, perte_shown:false
		}
	},
	watch:{
		"$store.state.produits"(new_val){
			this.produits = new_val
		}
	},
	methods:{
		close(){
			this.produit_shown = false
			this.stock_shown = false
			this.perte_shown = false
			this.active_product = null
			this.active_stock = null
		},
		addProduct(){
			this.produit_shown = true
		},
		editProduct(product){
			this.produit_shown = true
			this.active_product = product
		},
		createStock(product){
			this.stock_shown = true
			this.active_product = product
		},
		perdre(product){
			this.perte_shown = true
			this.active_stock = product
		},
		valider(stock){
			if(confirm(`voulez-vous vraiment valider ce stock?`)){
				axios.get(this.url+`/stock/${stock.id}/valider/`, this.headers)
				.then((response) => {
					this.$store.state.alert = {
            type:"success", message:"le stock a été validé"
          }
					for(key in Object.keys(stock)){
						stock[key] = response.data[key]
					}
					this.active_product.quantite += stock.quantite_actuelle
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, this.fetchData)
				});
			}
		},
		supprimer(stock){
			if(confirm(`voulez-vous vraiment supprimer ce stock?`)){
				axios.delete(this.url+`/stock/${stock.id}/`, this.headers)
				.then((response) => {
					let index = this.stocks.indexOf(stock)
					this.stocks.splice(index, 1)
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => supprimer(stock))
				});
			}
		},
		fold(produit){
			if(this.folded==produit.id){
				this.folded=-1
				return
			} else {
				this.folded=produit.id
			}
			this.progress = true
			axios.get(this.url+`/stock/?produit=${produit.id}`, this.headers)
			.then((response) => {
				this.stocks = response.data.results
				this.progress = false
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			});
		},
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/produit/?kiosk=${kiosk_id}`;
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
				this.displayErrorOrRefreshToken(error, this.fetchData)
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