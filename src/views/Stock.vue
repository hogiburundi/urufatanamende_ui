<template>
	<StatsLayout>
		<div class="import">
			<button>Generer un model</button>
			<button>Charger</button>
		</div>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>nom</th>
					<th>quantite</th>
					<th>unité</th>
					<th>unité entrante</th>
					<th class="right">prix de vente</th>
					<th class="right">P.V. Total</th>
					<th>
						<button>Ajouter</button>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>Black Label</td>
					<td>20</td>
					<td>Bouteilles</td>
					<td>Bouteilles</td>
					<td class="right">{{ money(140000) }}</td>
					<td class="right">{{ money(2800000)}}</td>
					<td>
						<button>Modifier</button>
						<button>Ajouter</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="6"></th>
					<th class="right">
						{{ money(2800000000)}}
					</th>
					<th></th>
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
.import *{
	margin: 10px 10px 0 0;
}
.table{
  height: calc(100vh - 150px);
  max-width: 100%;
}
</style>