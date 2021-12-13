<template>
<div class="notif">
	<div class="title">
		<h2>Notifications</h2>
		<div class="sv">
			<fa icon="search"/>
			<input type="text" placeholder="search">
		</div>
	</div>
	<div class="actions">
		<select>
			<option>Supprimer</option>
		</select>
		<button>Appliquer</button>
	</div>
	<div>
		<div class="cat">
			<h3>{{ notif.category }}</h3>
			<div>{{ datetime(notif.date) }}</div>
		</div>
		<p>{{ notif.text }}</p>
	</div>
</div>
</template>
<script>
export default{
	data(){
		return {
			notif:{
				category:'Excepteur sint occaecat',
				text:"lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				date:new Date()
			}
		}
	}
};
</script>
<style scoped>
.notif{
	margin: 20px;
}
.title{
	display: flex;
	justify-content: space-between;
}
.cat *{
	display: inline-block;
	margin-right: 5px;
	margin-bottom: 10px;
}
.actions *{
	display: inline-block;
	margin: 20px 10px 10px 0 ;
}
</style>