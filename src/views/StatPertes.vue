<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>produit</th>
					<th>du</th>
					<th>au</th>
					<th class="right">qtt. perdue</th>
					<th class="right">prix d'achat</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>inganzamarumpu</td>
					<td>{{ datetime(new Date()) }}</td>
					<td>{{ datetime(new Date()) }}</td>
					<td class="right">{{ money(36000) }} FBu</td>
					<td class="right">{{ money(36000)}} FBu</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4"></th>
					<th class="right">
						{{ money(36000)}} FBu
					</th>
					<th class="right">
						{{ money(0)}} FBu
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
	data(){
		return{}
	},
	components:{StatsLayout},
	methods:{
	}
};
</script>
<style scoped>
</style>