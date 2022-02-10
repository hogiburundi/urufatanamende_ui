<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th class="right">vente</th>
					<th class="right">dettes</th>
					<th>gerant</th>
					<th>date</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="versement in versements">
					<td>{{ versement.id }}</td>
					<td class="right">{{ versement.quantite }}</td>
					<td class="right">{{ money(versement.prix)}} FBu</td>
					<td>{{ versement.details }}</td>
					<td>{{ datetime(versement.date) }}</td>
					<td v-if="!versement.validated_by">
						<button  @click="valider(versement)">
							accepter
						</button>
						<button @click="supprimer(versement)">
							refuser
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th class="right">{{ money(
						versements.reduce((acc, x) => acc + x.prix, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						versements.reduce((acc, x) => acc + x.prix, 0)
					)}} FBu
					</th>
					<th colspan="2"></th>
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
			versements:this.$store.state.versements
		}
	},
	watch:{
		"$store.state.versements"(new_val){
			this.versements = new_val
		}
	},
	methods:{
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/versement/?kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.versements.push(...response.data.results)
				if(response.data.next.length > 0){
					this.next = response.data.next
					this.fetchData()
				} else {
					getTodayVersement()
					this.next = null
				}
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			});
		},
		getTodayVersement(){
			axios.get(this.url+`/versement/today/?kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.$store.state.versements.unshift(response.data)
			})
		}
	},
	mounted(){
		if(this.$store.state.versements.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>