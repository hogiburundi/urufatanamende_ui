<template>
<div class="contextmenu">
	<div>Profils</div>
	<div>Ajouter magasin</div>
	<div>Ajouter utilisateur</div>
	<div>Déconnexion</div>
</div>
</template>
<script>
export default{
};
</script>
<style scoped>
.contextmenu{
	position: absolute;
	z-index: 3;
	left: 10px;
	width: 150px;
	box-shadow: 2px 2px 5px;
	border: 1px solid #ddd5;
	background-color: white;
	display: none;
}
.contextmenu > div{
	padding: 3px 10px;
}
.contextmenu > div:hover{
	background-color: cadetblue;
}
</style>