<template>
	<StatsLayout>
	<div class="table">
		<table>
			<tr>
				<th>produit</th>
				<th>qtt. initiale</th>
				<th>qtt. restant</th>
				<th>prix d'achat</th>
				<th>date d'exp.</th>
				<th>user</th>
				<th>validateur</th>
				<th>option</th>
			</tr>
			<tr v-for="stock in stocks">
				<td>{{ stock.produit.nom }}</td>
				<td>{{ `${stock.quantite_initiale} ${stock.produit.unite}` }}</td>
				<td><b>{{ `${stock.quantite_actuelle} ${stock.produit.unite}` }}</b></td>
				<td>{{ money(stock.prix_total) }}</td>
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
			stocks:this.$store.state.stocks, progress:false,
			next:null, active_stock:null, perte_shown:false
		}
	},
	watch:{
		"$store.state.stocks"(new_val){
			this.stocks = new_val
		}
	},
	methods:{
		close(){
			this.stock_shown = false
			this.perte_shown = false
			this.active_stock = null
		},
		perdre(product){
			this.perte_shown = true
			this.active_stock = product
		},
		valider(stock){
			let index = this.$store.state.stocks.indexOf(stock)
			if(confirm(`voulez-vous vraiment valider ce stock?`)){
				axios.get(this.url+`/stock/${stock.id}/valider/`, this.headers)
				.then((response) => {
					this.$store.state.alert = {
						type:"success", message:"le stock a été validé"
					}
					this.$store.state.stocks[index] = response.data
					for(let produit of this.$store.state.produits){
						if(produit.id == stock.produit.id){
							produit.quantite += response.data.quantite_actuelle
							return
						}
					}
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => this.valider(stock))
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
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/stock/?produit__kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.stocks.push(...response.data.results)
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
		if(this.$store.state.stocks.length<1){
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