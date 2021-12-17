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
	<div v-if="notif">
		<div class="cat">
			<h3>{{ notif.category }}</h3>
			<div>{{ datetime(notif.updated_at) }}</div>
		</div>
		<p>{{ notif.content }}</p>

	</div>
</div>
</template>
<script>
export default{
	data(){
		return {
			id:-1
		}
	},
	computed:{
		notif(){
			return this.$store.state.notifs.find(x => x.id == this.id)
		}
	},
	mounted(){
		this.id = this.$route.params["id"]
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