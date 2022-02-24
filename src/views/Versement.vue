<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th class="right">vente</th>
					<th class="right">dettes</th>
					<th class="right">NET</th>
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
					<td class="right">{{ money(versement.vente + versement.dettes)}}</td>
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
					<th class="right">BIF {{ money(
						versements.reduce((acc, x) => acc + x.vente, 0)
					)}}
					</th>
					<th class="right">BIF {{ money(
						versements.reduce((acc, x) => acc + x.dettes, 0)
					)}}
					</th>
					<th class="right">BIF <span style="color:red">{{ money(
						versements.reduce((acc, x) => acc + x.dettes+ x.vente, 0)
					)}}</span>
					</th>
					<th colspan="3"></th>
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
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.getTodayVersement)
			});
		},
		verser(versement){
			let last_name = this.active_user.last_name
			if(prompt(`pour accepter cette perte tapez ${last_name}:`) == last_name){
				axios.post(this.url+`/versement/`, versement, this.headers)
				.then((response) => {
					this.$store.state.versements[0] = response.data
					this.getTodayVersement()
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => verser(versement))
				});
			}
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