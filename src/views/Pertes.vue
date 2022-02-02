<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>produit</th>
					<th>user</th>
					<th>date</th>
					<th class="right">qtt.</th>
					<th class="right">prix d'achat</th>
					<th>motif</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="perte in pertes">
					<td>{{ perte.id }}</td>
					<td>{{ perte.stock }}</td>
					<td>{{ perte.user }}</td>
					<td>{{ datetime(perte.date) }}</td>
					<td class="right">{{ perte.quantite }}</td>
					<td class="right">{{ money(perte.prix)}} FBu</td>
					<td>{{ perte.details }}</td>
					<td v-if="!perte.validated_by">
						<button  @click="valider(perte)">
							accepter
						</button>
						<button @click="supprimer(perte)">
							refuser
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="5"></th>
					<th class="right">{{ money(
						pertes.reduce((acc, x) => acc + x.prix, 0)
					)}} FBu
					<th></th>
					<th class="right">
						<!-- <button>tout accepter</button>
						<button>tout refuser</button> -->
					</th>
				</tr>
			</tfoot>
		</table>
		</div>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
export default{
	components:{StatsLayout},
	data(){
		return{
			pertes:this.$store.state.pertes
		}
	},
	watch:{
		"$store.state.pertes"(new_val){
			this.pertes = new_val
		}
	},
	methods:{
		supprimer(item){
			if(confirm("Voulez-vous vraiment annuler cette perte?")){
				axios.delete(`${this.url}/perte/${item.id}/`, this.headers)
				.then((response) => {
					let index = this.$store.state.pertes.indexOf(item)
					console.log(index)
					this.$store.state.pertes.splice(index, 1)
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => this.supprimer(item))
				});
			}
		},
		valider(item){
			let last_name = this.active_user.last_name
			console.log(this.active_user)
			if(prompt(`pour accepter cette perte tapez ${last_name}:`) == last_name){
				axios.get(`${this.url}/perte/${item.id}/valider/`, this.headers)
				.then((response) => {
					for(let key of Object.keys(item)){
						item[key] = response.data[key]
					}
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => this.supprimer(item))
				});
			}
		},
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/perte/?kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.pertes.push(...response.data.results)
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
		if(this.$store.state.pertes.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>