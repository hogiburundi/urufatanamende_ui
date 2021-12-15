<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>caissier</th>
					<th>date</th>
					<th class="right">somme</th>
					<th class="right">payée</th>
					<th class="right">reste</th>
					<th class="right">benefice</th>
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 30">
					<td>{{ i }}</td>
					<td>NKURUNZIZA Jonathan</td>
					<td>{{ datetime(new Date()) }}</td>
					<td class="right">{{ money(36000) }} FBu</td>
					<td class="right">{{ money(36000)}} FBu</td>
					<td class="right">{{ money(0) }} FBu</td>
					<td class="right">{{ money(2210) }} FBu</td>
					<td>
						<button @click="showDetails(i)">
							details
						</button>
						<button>Supprimer</button>
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
						{{ money(36000)}} FBu
					</th>
					<th class="right">
						{{ money(0)}} FBu
					</th>
					<th class="right">
						{{ money(0)}} FBu
					</th>
					<th colspan="2"></th>
				</tr>
			</tfoot>
		</table>
		</div>
		<DialogVentes :active="ventes_shown" :commande="active_command" @close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogVentes from "../components/dialog_ventes"

export default{
	data(){
		return{
			ventes_shown:false, active_command:null
		}
	},
	components:{ StatsLayout, DialogVentes },
	methods:{
		close(){
			this.ventes_shown = false
			this.active_command = null
		},
		showDetails(commande){
			this.ventes_shown = true
			this.active_command = {"id":commande}
		},
	}
};
</script>
<style scoped>
</style>