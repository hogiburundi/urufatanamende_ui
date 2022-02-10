<template>
	<StatsLayout>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>commande</th>
					<th>date</th>
					<th class="right">somme</th>
					<th>user</th>
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="payment in payments">
					<td>{{ payment.id }}</td>
					<td>No. {{ payment.commande }}</td>
					<td>{{ datetime(payment.date) }}</td>
					<td class="right">{{ money(payment.montant) }} FBu</td>
					<td>{{ payment.user }}</td>
					<td>
						<button @click="supprimer(payment)">
							supprimer
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3"></th>
					<th class="right">{{ money(
						payments.reduce((acc, x) => {
							return acc + x.montant
						}, 0)
					)}} FBu
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
	components:{StatsLayout},
	data(){
		return{
			payments:this.$store.state.payments
		}
	},
	watch:{
		"$store.state.payments"(new_val){
			this.payments = new_val
		}
	},
	methods:{
		valider(item){
			axios.get(`${this.url}/payment/${item.id}/valider/`, this.headers)
			.then((response) => {
				item.validated_by = response.data.validated_by
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, () => this.supprimer(item))
			});
		},
		supprimer(item){
			if(confirm("Voulez-vous vraiment supprimer ce payment")){
				axios.delete(`${this.url}/payment/${item.id}/`, this.headers)
				.then((response) => {
					let index = this.$store.state.payments.indexOf(item)
					this.$store.state.payments.splice(index, 1)
				}).catch((error) => {
					this.displayErrorOrRefreshToken(error, () => this.supprimer(item))
				});
			}
		},
		fetchData(){
			let link = ""
			let kiosk_id = this.getActiveKiosk().id
			if(!this.next){
				link = this.url+`/payment/?commande__kiosk=${kiosk_id}`;
			} else {
				link = this.next
			}
			axios.get(link, this.headers)
			.then((response) => {
				this.$store.state.payments.push(...response.data.results)
				if(response.data.next.length > 0){
					this.next = response.data.next
					this.fetchData()
				} else {
					this.next = null
				}
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			});
		},
	},
	mounted(){
		if(this.$store.state.payments.length<1){
			this.fetchData()
		}
	}
};
</script>
<style scoped>
</style>