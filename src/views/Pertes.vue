<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>produit</th>
					<th>user</th>
					<th>date</th>
					<th class="right">qtt.</th>
					<th class="right">prix d'achat</th>
					<th>motif</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="perte in pertes">
					<td>{{ perte.id }}</td>
					<td>{{ perte.stock }}</td>
					<td>{{ perte.user }}</td>
					<td>{{ datetime(perte.date) }}</td>
					<td class="right">{{ perte.quantite }}</td>
					<td class="right">{{ money(perte.prix)}} FBu</td>
					<td>{{ perte.details }}</td>
					<td>
						<button>accepter</button>
						<button>refuser</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="5"></th>
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
	components:{StatsLayout},
	data(){
		return{
			pertes:this.$store.state.pertes
		}
	},
	watch:{
		"$store.state.pertes"(new_val){
			this.pertes = new_val
		}
	},
	methods:{
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/perte/?kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.pertes.push(...response.data.results)
				if(response.data.next.length > 0){
					this.next = response.data.next
					this.fetchData()
				} else {
					this.next = null
				}
			}).catch((error) => {
				this.displaErrorOrRefreshToken(error, this.fetchData)
			});
		},
	},
	mounted(){
		if(this.$store.state.pertes.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>