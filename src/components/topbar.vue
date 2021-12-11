<template>
<div class="topbar">
	<div class="menu">
		<fa icon="bell"/>
		<div class="bubble">5</div>
	</div>
	<div class="menu">
		<fa icon="user"/>
	</div>
</div>
</template>
<script>
export default{
};
</script>
<style scoped>
.topbar{
	box-shadow: 2px 0 5px;
	height: 50px;
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.menu{
	padding: 10px 15px;
	position: relative;
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
	font-size: .6em;
	font-weight: 800;
	position: absolute;
	background-color: white;
	top: 5px;
	left: 20px;
}
</style>