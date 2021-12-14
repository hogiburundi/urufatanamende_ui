<template>
	<StatsLayout>
		<table>
			<thead>
				<tr>
					<th>username</th>
					<th>nom</th>
					<th>prenom</th>
					<th>telephone</th>
					<th>Role</th>
					<th>option</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 3">
					<td>inganzamarumpu</td>
					<td>NKURUNZIZA</td>
					<td>Jonathan</td>
					<td>75 96 06 96</td>
					<td>Vendeur</td>
					<td>
						<button>modifier</button>
						<button>supprimer</button>
					</td>
				</tr>
			</tbody>
		</table>
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