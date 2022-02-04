<template>
	<StatsLayout>
		<div class="import">
			<button>Generer un model</button>
			<button @click="importerXls">Charger</button>
			<input type="file" ref="fichier_produits" style="display: none;"
				@change="loadFile" accept=".csv">
			<button @click="uploadXls">
				Uploader {{ to_upload.length }} elements
			</button>
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
								<td v-else>
									<button @click="perdre(stock)">
										perte
									</button>
								</td>
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
		<DialogPerte
			:active="perte_shown"
			:item="active_stock"
			@close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogProduit from "../components/dialog_produit"
import DialogStock from "../components/dialog_stock"
import DialogPerte from "../components/dialog_perte"

export default{
	components:{ StatsLayout, DialogProduit, DialogStock, DialogPerte },
	data(){
		return{
			produits:this.$store.state.produits, folded:-1, progress:false,
			produit_shown:false, active_product:null, next:null, stocks:[],
			stock_shown:false, active_stock:null, perte_shown:false, to_upload:[],
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
		loadFile(event){
			if (event.target.files && event.target.files[0]) {
				let reader = new FileReader();
				reader.readAsBinaryString(event.target.files[0]);
				reader.onload = e => {
					const file = e.target.result;
					const lines = file.split(/\r\n|\n/);
					let array_line = []
					let date = 0
					let day = 0; let month = 0; let year = 0
					lines.forEach((line) => {
						array_line = line.split(";");
						date = parseInt(array_line[1]);
						if(date.length>4){
							year = 2000 + date%100
							date = parseInt(date/100)
							month = parseInt(date%100)%13
							date = parseInt(date/100)
							day = 1+parseInt(date%100)%28
						} else {
							month = 12; year = 2030; day = 31
						}
						this.to_upload.push({
							"nom":array_line[0],
							"date":`${year}-${month}-${day}`,
							"quantite":array_line[2],
							"unite_entrante":array_line[3],
							"prix_unitaire":parseInt(array_line[4]),
							"unite_sortante":array_line[7],
							"rapport":array_line[6],
						})
					});
					console.table(this.to_upload)
				};
				reader.onerror = (event) => {
					alert(event.target.error.name);
				};
			}
		},
		uploadXls(){
			console.log(this.to_upload)
			// axios.post(this.url+"/produit/", this.to_upload, this.headers)
			// .then((response) => {
			// 	this.$store.state.produits = response.data
			// }).catch((error) => {
			// 	this.displaErrorOrRefreshToken(error, this.fetchData)
			// });
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