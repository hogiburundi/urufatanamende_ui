<template>
<div class="magasin">
	<h2>Ajouter Utilisateur</h2>
	<div>Cet utilisateur pourra se connecter et utiliser le logiciel</div>
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
			<div>
				<select id="role">
					<option>Vendeur</option>
					<option>Gerant</option>
				</select>
				<button>Enregister</button>
			</div>
		</div>
	</form>
</div>
</template>
<script>
export default{

};
</script>
<style scoped>
.magasin{
	margin: 20px;
}
form{
	display: table;
}
.field{
	display: table-row;
}
.field *{
	display: table-cell;
	margin: 10px 0;
}
label{
	padding-right: 10px;
}
button, input, select{
	display: block!important;
	width: 100%;
}
.photo{
	width: 100px;
	height: 100px;
	margin: auto;
	border: 2px solid black;
}
</style>