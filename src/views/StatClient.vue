<template>
	<StatsLayout>
		<div class="table nonprintable">
		<table>
			<thead>
				<tr>
					<th>produit</th>
					<th>du</th>
					<th>au</th>
					<th class="right">Qtt</th>
					<th class="right">P.A. Total</th>
					<th class="right">P.V. Total</th>
					<th class="right">benefice</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in stats">
					<td>{{ item.produit }}</td>
					<td>{{ datetime(item.du) }}</td>
					<td>{{ datetime(item.au) }}</td>
					<td>{{ item.count }}</td>
					<td class="right">{{ money(item.p_a_t) }} FBu</td>
					<td class="right">{{ money(item.p_v_t) }} FBu</td>
					<td class="right">{{ money(item.p_v_t - item.p_a_t) }} FBu</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4"></th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + x.p_a_t
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + x.p_v_t
						}, 0)
					)}} FBu
					</th>
					<th class="right">{{ money(
						stats.reduce((acc, x) => {
							return acc + (x.p_v_t - x.p_a_t)
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
			stats:this.$store.state.stats_prod
		}
	},
	watch:{
		"$store.state.stats_prod"(new_val){
			this.stats = new_val
		}
	},
	methods:{
		fetchData(){
			let link = this.url+`/vente/stats/`;
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.stats_prod = response.data
			}).catch((error) => {
				this.displaErrorOrRefreshToken(error, this.fetchData)
			});
		},
	},
	mounted(){
		if(this.$store.state.stats_prod.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>