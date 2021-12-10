<template>
<div class="menus">
	<div class="kiosk">
		<fa class="bars" icon="bars"/>
		<div class="name">Alimentation UMUCO</div>
		<fa class="arrow" icon="sort-down"/>
	</div>
	<div class="user">
		<div class="img">
			<fa icon="user"/>
		</div>
		<div>
			<div>Bienvenue</div>
			<div class="username">Moise NTIRAMPEBA</div>
		</div>
		<fa class="arrow" icon="sort-down"/>
	</div>
</div>
</template>
<script>
export default{
};
</script>
<style scoped>
.menus{
	background-color: white;
	width: 200px;
	height: 100%;
	box-shadow: 0 0 5px;
	padding-top: 10px;
}
.kiosk, .user{
	display: flex;
	align-items: center;
	justify-content: sp;
	margin-top: 10px;
}
.img{
	background-color: var(--primary);
	color: white;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	font-size: 30px;
	text-align: center;
	border: 2px solid var(--primary);
	overflow: hidden;
	margin: 5px;
}
.bars{
	margin: 5px 5px 5px 10px;
}
.user{
	font-size: .7em;
}
.username, .name{
	font-weight: 700;
}
.name{
	font-size: .8em;
}
.arrow{
	font-size: 20px;
}
</style>