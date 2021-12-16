<template>
<div class="contextmenu">
	<div>Profils</div>
	<div @click="$router.push('/user').catch(()=>{})">
		Utilisateurs
	</div>
	<div @click="logOut">Déconnexion</div>
</div>
</template>
<script>
export default{
	methods:{
	}
};
</script>
<style scoped>
</style>