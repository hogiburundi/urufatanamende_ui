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
					<th>quantité</th>
					<th class="right">prix de vente</th>
					<th class="right">Valeur</th>
					<th>
						<button @click="addProduct">Ajouter un produit</button>
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="produit in produits">
					<tr @click="fold(produit)">
						<td>{{ produit.id }}</td>
						<td>{{ produit.nom }}</td>
						<td>{{ `${produit.unite_entrante}(${produit.rapport} ${produit.unite})` }}</td>
						<td><b>{{ `${produit.quantite || 0} ${produit.unite}` }}</b></td>
						<td class="right">{{ money(produit.prix_vente) }}</td>
						<td class="right">{{ money(produit.prix_vente * produit.quantite)}}</td>
						<td>
							<button @click.stop="editProduct(produit)">
								Modifier
							</button>
							<button @click.stop="createStock(produit)">
								<fa icon="plus"/>
								Stock
							</button>
						</td>
					</tr>
					<tr v-if="folded == produit.id">
						<td></td>
						<td colspan=5>
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
								<td v-else></td>
							</tr>
						</td>
					</tr>
				</template>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="5"></th>
					<th class="right">
					{{ money(
						produits.reduce((acc, x) => {
							return acc + (x.prix_vente * x.quantite)
						}, 0)
					)}}
					</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
		</div>
		<DialogProduit
			:active="produit_shown"
			:item="active_product"
			@close="close"/>
		<DialogStock
			:active="stock_shown"
			:produit="active_product"
			:item="active_stock"
			@close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogProduit from "../components/dialog_produit"
import DialogStock from "../components/dialog_stock"

export default{
	data(){
		return{
			produits:this.$store.state.produits, folded:-1, progress:false,
			produit_shown:false, active_product:null, next:null, stocks:[],
			stock_shown:false, active_stock:null
		}
	},
	watch:{
		"$store.state.produits"(new_val){
			this.produits = new_val
		}
	},
	components:{ StatsLayout, DialogProduit, DialogStock },
	methods:{
		close(){
			this.produit_shown = false
			this.stock_shown = false
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
					this.displaErrorOrRefreshToken(error, this.fetchData)
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
					this.displaErrorOrRefreshToken(error, () => supprimer(stock))
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
				this.displaErrorOrRefreshToken(error, this.fetchData)
			});
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