<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>produit</th>
					<th>date</th>
					<th class="right">qtt.</th>
					<th class="right">prix d'achat</th>
					<th>motif</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>inganzamarumpu</td>
					<td>{{ datetime(new Date()) }}</td>
					<td class="right">{{ 10 }}</td>
					<td class="right">{{ money(36000)}} FBu</td>
					<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</td>
					<td>
						<button>accepter</button>
						<button>refuser</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4"></th>
					<th class="right">
						{{ money(36000)}} FBu
					</th>
					<th></th>
					<th class="right">
						<button>tout accepter</button>
						<button>tout refuser</button>
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