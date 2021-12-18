<template>
<div class="magasin">
	<h2>Gestion des Utilisateurs</h2>
	<form @submit.prevent>
		<div class="field">
			<label for="username">Nom d'utilisateur</label>
			<input id="username" type="text" name="">
		</div>
		<div class="field">
			<label for="first_name">Nom</label>
			<input id="first_name" type="text" name="">
		</div>
		<div class="field">
			<label for="last_name">Prenom</label>
			<input id="last_name" type="text" name="">
		</div>
		<div class="field">
			<label for="phone">Telephone</label>
			<input id="phone" type="text" name="">
		</div>
		<div class="field">
			<label for="password">Mot de passe</label>
			<input id="password" type="password" name="">
		</div>
		<div class="field">
			<label for="role">Rôle</label>
			<select id="role">
				<option>Vendeur</option>
				<option>Gerant</option>
			</select>
		</div>
		<button type="reset">Reset</button>
		<button>Enregister</button>
	</form>
	<table>
		<thead>
			<tr>
				<th>username</th>
				<th>nom</th>
				<th>prenom</th>
				<th>Role</th>
				<th>option</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="attribution in attributions">
				<td>{{ attribution.user.username }}</td>
				<td>{{ attribution.user.first_name }}</td>
				<td>{{ attribution.user.last_name }}</td>
				<td>{{ attribution.name }}</td>
				<td>
					<button>modifier</button>
					<button>supprimer</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>
<script>
export default{
	data(){
		return {
			attributions:this.$store.state.attributions
		}
	},
	watch:{
		"$store.state.attributions"(new_val){
			this.attributions = new_val
		}
	},
	methods:{
		fetchData(){
			let kiosk_id = this.getActiveKiosk().id
			axios.get(this.url+`/attribution/?kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.$store.state.attributions = response.data.results;
			}).catch((error) => {
				this.displaErrorOrRefreshToken(error, this.fetchData)
			})
		},
	},
	mounted(){
		this.fetchData()
	},
};
</script>
<style scoped>
.magasin{
	margin: 20px;
}
form{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-end;
}
.field, form button{
	margin: 5px;
}
.field *{
	display: block;
}
table{
	width: 100%;
}
th{
	text-align: left;
}
</style>