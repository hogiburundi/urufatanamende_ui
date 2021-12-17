<template>
<div class="notifs">
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
			<option>Marquer comme lu</option>
			<option>Tout Marquer comme lu</option>
		</select>
		<button>Appliquer</button>
	</div>
	<div>
		<div v-for="notif, i in notifs" class="tab" @click="openNotif(i)">
			<div>
				<input type="checkbox" @click.stop :id="`id${i}`" name="">
			</div>
			<div>
				{{ notif.text }}</label>
			</div>
			<div class="left">
				{{ datetime(notif.date) }}</label>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default{
	data(){
		return {
			notifs:[
			]
		}
	},
	methods:{
		openNotif(id){
			this.$router.push(`/notifs/${id}`).catch(()=>{})
		}
	}
};
</script>
<style scoped>
.notifs{
	margin: 20px;
}
.title{
	display: flex;
	justify-content: space-between;
}
.actions *{
	display: inline-block;
	margin: 20px 10px 10px 0 ;
}
.tab{
	display: table-row;
}
.tab > div{
	display: table-cell;
	padding: 10px 5px 0 0;
}
</style>