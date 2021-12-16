<template>
<div class="magasin">
	<h2>Ajouter Magasin</h2>
	<form @submit.prevent>
		<div class="line">
			<label for="nom">Nom Commercial</label>
			<input id="nom" type="text" name="" v-model="nom">
		</div>
		<div class="line">
			<label for="photo">Photo</label>
			<div>
				<div class="photo">
					<img :src="logo_url" width="100">
				</div>
				<input id="photo" type="file" name="">
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
				<button>
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
			website:""
		}
	},
	watch:{
		'$route'(to, from){
			console.log(to)
			this.edition = to.path.includes("/edit")
			if(this.edition){
				this.prepareEdition()
			} else {
				this.logo_url = ""
			}
		}
	},
	methods:{
		prepareEdition(){
			let kiosk = this.getActiveKiosk()
			this.logo_url = this.base_url+kiosk.logo
			this.tel = kiosk.tel
			this.nom = kiosk.nom
			this.email = kiosk.email
			this.website = kiosk.website
		}
	},
	updated(){
		
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