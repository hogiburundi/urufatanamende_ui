<template>
<div class="contextmenu">
	<div @click="$router.push('/users').catch(()=>{})">
		Profils
	</div>
	<div @click="logOut">
		Déconnexion
	</div>
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