<template>
<div class="magasin">
	<h2>Ajouter Magasin</h2>
	<form @submit.prevent>
		<div class="line">
			<label for="nom">Nom Commercial</label>
			<input id="nom" type="text" name="">
		</div>
		<div class="line">
			<label for="photo">Photo</label>
			<div>
				<div class="photo"></div>
				<input id="photo" type="file" name="">
			</div>
		</div>
		<div class="line">
			<label for="E">E-mail</label>
			<input id="E-mail" type="text" name="">
		</div>
		<div class="line">
			<label for="phone">Télephone</label>
			<input id="phone" type="text" name="">
		</div>
		<div class="line">
			<label for="website">Site Internet</label>
			<div>
				<input id="website" type="text" name="">
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
</style>