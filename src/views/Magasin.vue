<template>
<div class="magasin">
	<h2>{{ edition?"Modifier":"Ajouter" }} Magasin</h2>
	<form @submit.prevent>
		<label for="nom">Nom Commercial</label>
		<input id="nom" type="text" name="" v-model="nom">

		<label for="photo">Photo</label>
		<div class="img">
			<div class="photo" @click="chooseImg">
				<img :src="logo_url" width="100" id="preview">
			</div>
			<input id="photo" type="file"
				style="display: none;" 
				accept=".jpeg,.jpg,.png"
				@change="e => loadImage(e)">
			<div>{{ logs }}</div>
		</div>

		<label for="E">E-mail</label>
		<input id="E-mail" type="text" name="" v-model="email">

		<label for="phone">Télephone</label>
		<input id="phone" type="text" name="" v-model="tel">

		<div class="doubled">
			<h3>PROFILE BASIC OBR</h3>
			<hr>
		</div>

		<label position="floating">Type de contribuable</label>
		<select v-model="tp_type">
			<option value="1">Personne Physique</option>
			<option value="2">Personne Morale</option>
		</select>

		<label position="floating">Nom et prénom</label>
		<input type="text"
			placeholder="Nom et prénom"
			v-model="tp_name"
			clearInput/>
			
		<label position="floating">NIF du contribuable</label>
		<input type="text"
			placeholder="NIF du contribuable"
			v-model="tp_TIN"
			clearInput/>

		<label position="floating">Le numéro du registre de commerce</label>
		<input type="text"
			placeholder="Le numéro du registre de commerce"
			v-model="tp_trade_number"
			clearInput/>

		<label position="floating">Boite postale</label>
		<input type="text"
			placeholder="Boite postale"
			v-model="tp_postal_number"
			clearInput/>

		<label position="floating">Numéro de téléphone</label>
		<input type="text"
			placeholder="Numéro de téléphone"
			v-model="tp_phone_number"
			clearInput/>

		<label position="floating">Province</label>
		<input type="text"
			placeholder="Province"
			v-model="tp_address_province"
			clearInput/>

		<label position="floating">Commune</label>
		<input type="text"
			placeholder="Commune"
			v-model="tp_address_commune"
			clearInput/>

		<label position="floating">Quartier</label>
		<input type="text"
			placeholder="Quartier"
			v-model="tp_address_quartier"
			clearInput/>

		<label position="floating">Avenue</label>
		<input type="text"
			placeholder="Avenue"
			v-model="tp_address_avenue"
			clearInput/>

		<label position="floating">Numero</label>
		<input type="text"
			placeholder="Numero"
			v-model="tp_address_number"
			clearInput/>

		<label position="floating">Centre fiscal du contribuable</label>
		<select v-model="tp_fiscal_center">
			<option value="DGC">
				Direction des Grands contribuables
			</option>
			<option value="DMC">
				Direction des Moyens Contribuables
			</option>
			<option value="DPMC">
				Direction des Petits et Micro Contribuables
			</option>
		</select>

		<label position="floating">Secteur d'activité</label>
		<input type="text"
			placeholder="Secteur d'activité"
			v-model="tp_activity_sector"
			clearInput/>

		<label position="floating">Forme Juridique</label>
		<input type="text"
			placeholder="Forme Juridique"
			v-model="tp_legal_form"
			clearInput/>
		<div class="doubled">
			<h3>INFORMATIONS DE CONNEXION OBR</h3>
			<hr>
		</div>
		<label position="floating">OBR Username</label>
		<input type="text"
			placeholder="nom d'utilisateur OBR"
			v-model="username"
			clearInput/>

		<label position="floating">Password</label>
		<input type="password"
			placeholder="Password"
			v-model="password"/>
		<label for="website">Site Internet</label>

		<div>
			<input id="website" type="text" name="" v-model="website">
			<button @click="performAction">
				{{ edition?"Modifier":"Creer" }}
			</button>
		</div>
	</form>
</div>
</template>
<script>
export default{
	data(){
		return {
			edition:false,
			logo:null,
			nom:"",
			tel:"",
			logo_url:"",
			email:"",
			website:"",
			logs:"",

			tp_type: "",
			tp_name: "",
			tp_TIN: "",
			tp_trade_number: "",
			tp_postal_number: "",
			tp_phone_number: "",
			tp_address_province: "",
			tp_address_commune: "",
			tp_address_quartier: "",
			tp_address_avenue: "",
			tp_address_number: "",
			tp_fiscal_center: "",
			tp_activity_sector: "",
			tp_legal_form: "",
			username: "",
			password: ""
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
		chooseImg(){
			photo.click()
		},
		prepareEdition(){
			let kiosk = this.getActiveKiosk()
			this.logo_url = kiosk.logo
			this.tel = kiosk.tel
			this.nom = kiosk.nom
			this.email = kiosk.email
			this.website = kiosk.website
			this.tp_type = kiosk.tp_type
			this.tp_name = kiosk.tp_name
			this.tp_TIN = kiosk.tp_TIN
			this.tp_trade_number = kiosk.tp_trade_number
			this.tp_postal_number = kiosk.tp_postal_number
			this.tp_phone_number = kiosk.tp_phone_number
			this.tp_address_province = kiosk.tp_address_province
			this.tp_address_commune = kiosk.tp_address_commune
			this.tp_address_quartier = kiosk.tp_address_quartier
			this.tp_address_avenue = kiosk.tp_address_avenue
			this.tp_address_number = kiosk.tp_address_number
			this.tp_fiscal_center = kiosk.tp_fiscal_center
			this.tp_activity_sector = kiosk.tp_activity_sector
			this.tp_legal_form = kiosk.tp_legal_form
			this.username = kiosk.username
			this.password = kiosk.password
		},
		performAction(){
			if(this.edition){
				this.updateKiosk()
			} else {
				this.createKiosk()
			}
		},
		getData(){
			let data = new FormData()
			let kiosk = this.getActiveKiosk()
			if(!!this.nom) data.append("nom", this.nom)
			if(!!this.tel) data.append("tel", this.tel)
			if(!!this.email) data.append("email", this.email)
			if(!!this.logo) data.append("logo", this.logo)
			if(!!this.website) data.append("website", this.website)

			if(!!tp_type) data.append("tp_type", this.tp_type)
			if(!!tp_name) data.append("tp_name", this.tp_name)
			if(!!tp_TIN) data.append("tp_TIN", this.tp_TIN)
			if(!!tp_trade_number) data.append("tp_trade_number", this.tp_trade_number)
			if(!!tp_postal_number) data.append("tp_postal_number", this.tp_postal_number)
			if(!!tp_phone_number) data.append("tp_phone_number", this.tp_phone_number)
			if(!!tp_address_province) data.append("tp_address_province", this.tp_address_province)
			if(!!tp_address_commune) data.append("tp_address_commune", this.tp_address_commune)
			if(!!tp_address_quartier) data.append("tp_address_quartier", this.tp_address_quartier)
			if(!!tp_address_avenue) data.append("tp_address_avenue", this.tp_address_avenue)
			if(!!tp_address_number) data.append("tp_address_number", this.tp_address_number)
			if(!!tp_fiscal_center) data.append("tp_fiscal_center", this.tp_fiscal_center)
			if(!!tp_activity_sector) data.append("tp_activity_sector", this.tp_activity_sector)
			if(!!tp_legal_form) data.append("tp_legal_form", this.tp_legal_form)
			if(!!username) data.append("username", this.username)
			if(!!password) data.append("password", this.password)

			return data
		},
		updateKiosk(){
			axios.patch(this.url+`/kiosk/${kiosk.id}/`, this.getData(), this.headers)
			.then((response) => {
				for (let key of Object.keys(response.data)) {
					kiosk[key] = response.data[key]
				}
				this.$store.state.alert = {
					type:"success", message:`le kiosk ${this.nom} a été mise à jour`
				}
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.updateKiosk)
			})
		},
		createKiosk(){
			axios.post(this.url+`/kiosk/`, this.getData(), this.headers)
			.then((response) => {
				this.active_user.kiosks.push(response.data)
				this.$store.state.alert = {
					type:"success", message:`le kiosk ${this.nom} a été créé avec succes il ne reste que l'approbation de la part de HOGI`
				}
				this.logo_url = null
				this.tel = null
				this.nom = null
				this.email = null
				this.website = null

				this.tp_type = null
				this.tp_name = null
				this.tp_TIN = null
				this.tp_trade_number = null
				this.tp_postal_number = null
				this.tp_phone_number = null
				this.tp_address_province = null
				this.tp_address_commune = null
				this.tp_address_quartier = null
				this.tp_address_avenue = null
				this.tp_address_number = null
				this.tp_fiscal_center = null
				this.tp_activity_sector = null
				this.tp_legal_form = null
				this.username = null
				this.password = null
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.updateKiosk)
			})
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
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-row-gap: 10px;
	max-width: 500px;
	align-items: flex-start;
}
.doubled{
	grid-column: 1/-1;
}
form input, form select, form input, form button, .img{
	max-width: 200px;
}
label{
	padding-right: 10px;
}
button, input{
	width: 100%;
}
button{
	margin-top: 10px;
}
.photo{
	width: 150px;
	height: 150px;
	margin: auto;
	border: 2px solid black;
}
.photo *{
	margin: 0;
}
</style>