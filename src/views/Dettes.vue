<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>client</th>
					<th>date</th>
					<th>somme</th>
					<th>payée</th>
					<th>reste</th>
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>NKURUNZIZA Jonathan</td>
					<td>{{ datetime(new Date()) }}</td>
					<td class="right">{{ money(36000) }} FBu</td>
					<td class="right">{{ money(0) }} FBu</td>
					<td>{{ money(2210) }}</td>
					<td>
						<button>payer</button>
						<button>valider</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3"></th>
					<th class="right">
						{{ money(36000)}} FBu
					</th>
					<th class="right">
						{{ money(0)}} FBu
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