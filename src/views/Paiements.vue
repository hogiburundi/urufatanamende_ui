<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>commande</th>
					<th>date</th>
					<th>somme</th>
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>inganzamarumpu</td>
					<td>{{ datetime(new Date()) }}</td>
					<td class="right">{{ money(36000) }} FBu</td>
					<td>{{ money(2210) }}</td>
					<td>
						<button>modifier</button>
						<button>supprimer</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="2"></th>
					<th class="right">
						{{ money(36000)}} FBu
					</th>
					<th colspan="2"></th>
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