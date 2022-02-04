<template>
	<StatsLayout>
		<div class="table nonprintable">
		<table>
			<thead>
				<tr>
					<th>client</th>
					<th>du</th>
					<th>au</th>
					<th class="right">fois</th>
					<th class="right">montant</th>
					<th class="right">payée</th>
					<th class="right">reste</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in stats">
					<td>{{ item.client }}</td>
					<td>{{ datetime(item.du) }}</td>
					<td>{{ datetime(item.au) }}</td>
					<td>{{ item.fois }}</td>
					<td class="right">{{ money(item.prix) }} FBu</td>
					<td class="right">{{ money(item.payee) }} FBu</td>
					<td class="right">{{ money(item.prix - item.payee) }} FBu</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4"></th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + x.prix
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + x.payee
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + (x.prix - x.payee)
						}, 0)
					)}} FBu
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
	components:{ StatsLayout },
	data(){
		return{
			stats:this.$store.state.stats_client
		}
	},
	watch:{
		"$store.state.stats_client"(new_val){
			this.stats = new_val
		}
	},
	methods:{
		fetchData(){
			let kiosk_id = this.getActiveKiosk().id
			let link = this.url+`/commande/stats/?kiosk=${kiosk_id}`;
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.stats_client = response.data
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			});
		},
	},
	mounted(){
		if(this.$store.state.stats_client.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>