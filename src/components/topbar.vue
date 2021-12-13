<template>
<div class="topbar">
	<div class="menu">
		<div>
			<fa icon="bell"/>
			<div class="bubble">5</div>	
		</div>
		<div class="contextmenu notifs">
			<div class="title">
				<div class="u">tout lire</div>
				<h4>Notifications</h4>
			</div>
			<div class="notif">consectetur adipisicing</div>
			<div class="notif">adipisicing elit, sed do</div>
			<div class="notif">aliqua. Ut enim ad minim</div>
			<div class="notif">incididunt ut labore et</div>
			<div class="notif">Ut enim ad minim veniam,</div>
			<div class="notif">labore et dolore magna</div>
			<center>
				<span class="u">tout voir</span>
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
	components:{ ContextMenu }
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