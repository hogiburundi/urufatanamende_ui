<template>
<div class="magasin">
	<h2>Gestion des Utilisateurs</h2>
	<form @submit.prevent v-if="!!active_attr || user_is_owner">
		<div class="field">
			<label for="username">Nom d'utilisateur</label>
			<input id="username" type="text" v-model="username">
		</div>
		<div class="field">
			<label for="first_name">Nom</label>
			<input id="first_name" type="text" v-model="nom">
		</div>
		<div class="field">
			<label for="last_name">Prenom</label>
			<input id="last_name" type="text" v-model="prenom">
		</div>
		<div class="field">
			<label for="password">Mot de passe</label>
			<input id="password" type="password" v-model="password">
		</div>
		<div class="field" v-if="user_is_owner">
			<label for="role">Rôle</label>
			<select id="role" v-model="role">
				<option v-for="r in $store.state.roles" :value="r" :selected="role==r?'on':'off'">
					{{ r.toUpperCase() }}
				</option>
			</select>
		</div>
		<button type="reset" @click="active_attr=null">Reset</button>
		<button @click="updateUser" v-if="!!active_attr">
			modifier
		</button>
		<button @click="createUser" v-else>
			ajouter
		</button>
	</form>
	<table>
		<thead>
			<tr>
				<th>username</th>
				<th>nom</th>
				<th>prenom</th>
				<th>kiosk</th>
				<th>role</th>
				<th>option</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="attribution in attributions">
				<td>{{ attribution.user.username }}</td>
				<td>{{ attribution.user.first_name }}</td>
				<td>{{ attribution.user.last_name }}</td>
				<td>{{ attribution.kiosk }}</td>
				<td>{{ attribution.name }}</td>
				<td>
					<button @click="editUser(attribution)">
						modifier
					</button>
					<button>
						supprimer
					</button>
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
			attributions:this.$store.state.attributions,
			active_attr:null, username:"", nom:"" ,prenom:"",
			role:"", password:""
		}
	},
	watch:{
		"$store.state.attributions"(new_val){
			this.attributions = new_val
		},
		active_attr(new_val){
			if(!!new_val){
				this.username = new_val.user.username
				this.nom = new_val.user.last_name
				this.prenom = new_val.user.first_name
				this.role = new_val.name
			}
		}
	},
	methods:{
		fetchData(){
			let kiosk_id = this.getActiveKiosk().id
			axios.get(this.url+`/attribution/?kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.$store.state.attributions = response.data;
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			})
		},
		editUser(attribution){
			this.active_attr = attribution
		},
		updateUser(){
			let data = {
				"user" : {
					"username": this.username,
					"last_name": this.nom,
					"first_name": this.prenom,
					"password": this.password
				},
				"name" : this.role,
				"kiosk" : this.getActiveKiosk().id
			}
			axios.put(this.url+`/attribution/${this.active_attr.id}/`, data, this.headers)
			.then((response) => {
				let attrib
				for (var i = this.attributions.length - 1; i >= 0; i--) {
					attrib = this.attributions[i]
					if(attrib.id == response.data.id){
						this.$store.state.attributions.splice(i, 1)
						this.$store.state.attributions.push(response.data)
						break;
					}
				}
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			})
		},
		createUser(){
			let data = {
				"user" : {
					"username": this.username,
					"last_name": this.nom,
					"first_name": this.prenom,
					"password": this.password
				},
				"name" : this.role,
				"kiosk" : this.getActiveKiosk().id
			}
			axios.post(this.url+`/attribution/`, data, this.headers)
			.then((response) => {
				this.$store.state.attributions.push(response.data);
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.fetchData)
			})
		}
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