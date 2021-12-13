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
	<table>
		<tbody>
			<tr v-for="notif, i in notifs">
				<td>
					<input type="checkbox" :id="`id${i}`" name="">
				</td>
				<td><label :for="`id${i}`">{{ notif.text }}</label></td>
				<td><label :for="`id${i}`">{{ datetime(notif.date) }}</label></td>
			</tr>
		</tbody>
	</table>
</div>
</template>
<script>
export default{
	data(){
		return {
			notifs:[
				{text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",date:new Date()},
				{text:"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat", date:new Date()},
				{text:"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", date:new Date()},
				{text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit", date:new Date()}
			]
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
</style>