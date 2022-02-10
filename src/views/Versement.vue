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
				<tr v-for="versement, i in versements" :class="{'active':!versement.user}">
					<td>{{ i+1 }}</td>
					<td class="right">{{ money(versement.vente) }}</td>
					<td class="right">{{ money(versement.dettes)}}</td>
					<td>{{ versement.user }}</td>
					<td>{{ datetime(versement.date) }}</td>
					<td>
						<button @click="verser(versement)">
							verser
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th class="right">{{ money(
						versements.reduce((acc, x) => acc + x.vente, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						versements.reduce((acc, x) => acc + x.dettes, 0)
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
			versements:this.$store.state.versements, next:null
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
				if(!!response.data.next){
					this.next = response.data.next
					this.fetchData()
				} else {
					this.getTodayVersement()
					this.next = null
				}
			}).catch((error) => {
				console.error(error)
				this.displayErrorOrRefreshToken(error, this.fetchData)
			});
		},
		getTodayVersement(){
			let kiosk_id = this.getActiveKiosk().id
			axios.get(this.url+`/versement/today/?kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.$store.state.versements.unshift(response.data)
			})
		},
		verser(versement){

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
.active{
	color: green;
}
</style>