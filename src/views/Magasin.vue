<template>
<div class="magasin">
	<h2>{{ edition?"Modifier":"Ajouter" }} Magasin</h2>
	<form @submit.prevent>
		<div class="line">
			<label for="nom">Nom Commercial</label>
			<input id="nom" type="text" name="" v-model="nom">
		</div>
		<div class="line">
			<label for="photo">Photo</label>
			<div>
				<div class="photo">
					<img :src="logo_url" width="100" id="preview">
				</div>
				<input id="photo" type="file" accept=".jpeg,.jpg,.png" @change="e => loadImage(e)">
				<div>{{ logs }}</div>
			</div>
		</div>
		<div class="line">
			<label for="E">E-mail</label>
			<input id="E-mail" type="text" name="" v-model="email">
		</div>
		<div class="line">
			<label for="phone">Télephone</label>
			<input id="phone" type="text" name="" v-model="tel">
		</div>
		<div class="line">
			<label for="website">Site Internet</label>
			<div>
				<input id="website" type="text" name="" v-model="website">
				<button @click="performAction">
					{{ edition?"Modifier":"Creer" }}
				</button>
			</div>
		</div>
	</form>
</div>
</template>
<script>
export default{
	data(){
		return {
			edition:false, logo:null, nom:"", tel:"", logo_url:"", email:"",
			website:"", logs:""
		}
	},
	watch:{
		'$route'(to, from){
			this.edition = to.path.includes("/edit")
			if(this.edition){
				this.prepareEdition()
			} else {
				this.logo_url = ""
			}
		}
	},
	methods:{
		loadImage(event){
			let file = event.target.files[0]
			if (file.size>300_000) {
				this.logs = "l'image ne peut pas depasser 300ko"
			} else {
				this.logs = ""
				this.logo = file
				let fr = new FileReader();
				fr.onload = function(){
					preview.src = fr.result;
				}
				fr.readAsDataURL(file);
			}
		},
		prepareEdition(){
			let kiosk = this.getActiveKiosk()
			this.logo_url = kiosk.logo
			this.tel = kiosk.tel
			this.nom = kiosk.nom
			this.email = kiosk.email
			this.website = kiosk.website
		},
		performAction(){
			if(this.edition){
				this.updateKiosk()
			} else {
				this.createKiosk()
			}
		},
		updateKiosk(){
			let data = new FormData()
			let kiosk = this.getActiveKiosk()
			if(!!this.nom) data.append("nom", this.nom)
			if(!!this.tel) data.append("tel", this.tel)
			if(!!this.email) data.append("email", this.email)
			if(!!this.logo) data.append("logo", this.logo)
			if(!!this.website) data.append("website", this.website)
			axios.patch(this.url+`/kiosk/${kiosk.id}/`, data, this.headers)
			.then((response) => {
				for (let key of Object.keys(response.data)) {
					kiosk[key] = response.data[key]
				}
			}).catch((error) => {
				this.displaErrorOrRefreshToken(error, this.updateKiosk)
			})
		},
		createKiosk(){

		},
	},
	mounted(){
		this.edition = this.$router.history.current.path.includes("/edit")
		if(this.edition){
			this.prepareEdition()
		}
	}
};
</script>
<style scoped>
.magasin{
	margin: 20px 0 0 20px;
	height: calc(100% - 70px);
	overflow-y: auto;
}
form{
	display: table;
}
.line{
	display: table-row;
}
.line *{
	display: table-cell;
	margin: 10px 0;
}
label{
	padding-right: 10px;
}
button, input{
	display: block!important;
	width: 100%;
}
.photo{
	width: 100px;
	height: 100px;
	margin: auto;
	border: 2px solid black;
}
.photo *{
	margin: 0;
}
</style>