<template>
<div class="topbar">
	<div class="menu">
		<fa icon="bell"/>
		<div class="bubble">5</div>
	</div>
	<div class="menu">
		<div class="rich">
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
</style>