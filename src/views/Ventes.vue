<template>
	<StatsLayout>
		<div class="table nonprintable">
		<table>
			<thead>
				<tr>
					<th>No.</th>
					<th>date</th>
					<th>caissier</th>
					<th>client</th>
					<th class="right">somme</th>
					<th class="right">reste</th>
					<th class="right">benefice</th>
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in commandes">
					<td>{{ item.id }}</td>
					<td>{{ datetime(item.date) }}</td>
					<td>{{ item.user }}</td>
					<td>{{ item.client }}</td>
					<td class="right">{{ money(item.prix) }} FBu</td>
					<td class="right">{{ money(item.prix-item.payee) }} FBu</td>
					<td class="right">{{ money() }} FBu</td>
					<td>
						<button @click="showDetails(item)">
							details
						</button>
						<button  @click="supprimer(item)">
							Supprimer
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4"></th>
					<th class="right">{{ money(
						commandes.reduce((acc, x) => {
							return acc + x.prix
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						commandes.reduce((acc, x) => {
							return acc + (x.prix - x.payee)
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
					)}} FBu
					</th>
					<th colspan="2"></th>
				</tr>
			</tfoot>
		</table>
		</div>
		<DialogVentes :active="ventes_shown" :commande="active_command" @close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogVentes from "../components/dialog_ventes"

export default{
	components:{ StatsLayout, DialogVentes },
	data(){
		return{
			ventes_shown:false, active_command:null, next:null, 
			commandes:this.$store.state.commandes
		}
	},
	watch:{
		"$store.state.commandes"(new_val){
			this.commandes = new_val
		}
	},
	methods:{
		close(){
			this.ventes_shown = false
			this.active_command = null
		},
		showDetails(commande){
			this.ventes_shown = true
			this.active_command = commande
		},
		supprimer(item){
			if(confirm("Voulez-vous vraiment annuler cette commande?")){
				axios.delete(`${this.url}/commande/${item.id}/`, this.headers)
				.then((response) => {
					let index = this.$store.state.commandes.indexOf(item)
					this.$store.state.commandes.splice(index, 1)
				}).catch((error) => {
					this.displaErrorOrRefreshToken(error, () => this.supprimer(item))
				});
			}
		},
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/commande/?kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.commandes.push(...response.data.results)
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
		if(this.$store.state.commandes.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>