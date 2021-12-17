<template>
<div class="topbar">
	<div class="menu">
		<div>
			<fa icon="bell"/>
			<div class="bubble">{{ notifs.length }}</div>	
		</div>
		<div class="contextmenu notifs">
			<div class="title">
				<div class="u" @click="markAllAsRead">tout lire</div>
				<h4>Notifications</h4>
			</div>
			<div class="notif" v-for="notif in notifs.slice(0,5)" @click="openNotif(notif.id)">
				{{ notif.content }}
			</div>
			<center>
				<span class="u" @click="openAllNotifs">tout voir</span>
			</center>
		</div>
	</div>
	<div class="menu">
		<div>
			<fa icon="user"/>
		</div>
		<ContextMenu/>
	</div>
</div>
</template>
<script>
import ContextMenu from "./context_menu"

export default{
	components:{ ContextMenu },
	data(){
		return {
			notifs: []
		}
	},
	watch:{
		"$store.state.notifs"(new_val){
			this.notifs = new_val
		}
	},
	methods:{
		openNotif(id){
			this.$router.push(`/notifs/${id}`).catch(()=>{})
		},
		openAllNotifs(){
			this.$router.push("/notifs").catch(()=>{})
		},
		markAllAsRead(){
		},
		fetchData(){
			let kiosk_id = this.getActiveKiosk().id
			axios.get(this.url+`/notification/?kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.$store.state.notifs = response.data.results;
			}).catch((error) => {
				this.displaErrorOrRefreshToken(error, this.fetchData)
			})
		}
	},
	mounted(){
		this.fetchData()
	}
};
</script>
<style scoped>
.topbar{
	box-shadow: 2px 0 5px;
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.menu{
	padding: 10px 15px;
	position: relative;
	font-size: 1.3em;
}
.menu *{
	display: inline-block;
}
.menu:hover{
	background-color: cadetblue;
}
.bubble{
	border: 1px solid black;
	border-radius: 50%;
	padding: 0 2px;
	min-width: 17px;
	text-align: center;
	font-size: .6em;
	font-weight: 800;
	position: absolute;
	background-color: white;
	top: 5px;
	left: 25px;
}
.contextmenu{
	position: absolute;
	right: 0;
	margin-top: 5px;
	font-size: .7em;
	display: none;
}
.menu:hover .contextmenu{
	display: block!important;
}
.notifs{
	width: 200px;
	right:-40px;
}
.notifs *{
	display: block;
}
.notifs *:hover{
	background-color: #fff0;
}
.notif:hover{
	background-color: #f5f5f5;
	border-bottom: 2px solid #eee;
}
.notif{
	border-bottom: 2px solid #eee;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.title{
	position: relative;
}
.u{
	text-decoration: underline!important;
}
.title .u{
	position: absolute;
	right: 5px;
}
.u, .notif{
	cursor: pointer;
}
</style>