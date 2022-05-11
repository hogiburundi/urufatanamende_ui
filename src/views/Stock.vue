<template>
	<StatsLayout @search="search">
	<button @click="generateCSV" style="margin-top: 10px">
		<fa icon="download"/>
		Exporter
	</button>
	<div class="table">
		<table>
			<tr>
				<th @click="orderBy('')">produit</th>
				<th @click="orderBy('')">P.V.U.</th>
				<th @click="orderBy('quantite_initiale')">qtt. initiale</th>
				<th @click="orderBy('quantite_actuelle')">qtt. restant</th>
				<th @click="orderBy('prix_total')">prix d'achat</th>
				<th @click="orderBy('date_expiration')">date d'exp.</th>
				<th @click="orderBy('user')">user</th>
				<th @click="orderBy('validated_by')">validateur</th>
				<th>option</th>
			</tr>
			<tr v-for="stock in stocks">
				<td>{{ stock.produit.nom }}</td>
				<td>{{ money(stock.produit.prix_vente) }}</td>
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
		search(keyword){
			this.stocks = this.$store.state.stocks.filter(x =>{
				return JSON.stringify(x).toLowerCase().includes(keyword.toLowerCase())
			})
		},
		compareStings(a, b, order){
			if(a[order]>b[order]){
				return 1
			} else if(a[order]==b[order]){
				return 0
			} else {
				return -1
			}
		},
		orderBy(order){
			let comp = 0
			let str_comp = 0
			if(this.order == order){
				this.stocks.sort((a, b) => {
					return typeof(a[order]) == "string"?this.compareStings(a, b, order):a[order]-b[order]
				})
				this.order = ""
			} else {
				this.stocks.sort((a, b) => {
					return typeof(a[order]) == "string"?this.compareStings(b, a, order):b[order]-a[order]
				})
				this.order = order
			}
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
		generateCSV(){
			let data = "sep=;\n";
			for(let key of Object.keys(this.stocks[0])){
				data += `${key};`
			}
			data += "\n"
			for(let stock of this.stocks){
				for(let key of Object.keys(this.stocks[0])){
					if(key == "produit"){
						data += `${stock[key].nom};`
					} else {
						data += `${stock[key]};`
					}
				}
				data += "\n"
			}
			window.location = "data:text/csv;base64,77u/" + btoa(data);
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