<template>
<div class="menus">
	<div class="select">
		<div class="kiosk">
			<fa class="img" icon="bars"/>
			<div class="name">Alimentation UMUCO</div>
			<fa class="arrow" icon="sort-down"/>
		</div>
		<div class="contextmenu" style="width: 200px;">
			<div>BIMBO Super Market</div>
			<div>Pharmacie AJENITEKA</div>
			<div @click="$router.push('/magasin')">
				Ajouter magasin
			</div>
		</div>
	</div>
	<div class="select">	
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
		<ContextMenu/>
	</div>
	<div class="submenus clickable" @click="$router.push('/')">
		<fa class="img" icon="tachometer-alt"/>
		<div class="name">Accueil</div>
	</div>
	<div class="submenus">
		<fa class="img" icon="chart-bar"/>
		<div>
			<div class="name">Statistiques</div>
			<div class="element">
				<fa class="img" icon="long-arrow-alt-right"/>
				<div>Vente</div>
			</div>
			<div class="element">
				<fa class="img" icon="long-arrow-alt-right"/>
				<div>Dettes</div>
			</div>
			<div class="element">
				<fa class="img" icon="long-arrow-alt-right"/>
				<div>Paiements</div>
			</div>
			<div class="element">
				<fa class="img" icon="long-arrow-alt-right"/>
				<div>Clientèle</div>
			</div>
		</div>
	</div>
	<div class="submenus clickable">
		<fa class="img" icon="box"/>
		<div class="name">Stock</div>
	</div>
	<div class="submenus clickable">
		<fa class="img" icon="exclamation-triangle"/>
		<div class="name">Pertes</div>
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
.menus{
	background-color: white;
	min-width: 200px;
	height: 100%;
	box-shadow: 0 0 5px;
	padding-top: 10px;
}
.menus > div{
	padding: 5px 0;
}
.kiosk, .user{
	display: flex;
	align-items: center;
	justify-content: sp;
	margin-top: 10px;
}
.submenus{
	display: flex;
	align-items: flex-start;
}
.user .img{
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
.img{
	margin: 0 10px;
}
.user{
	font-size: .7em;
	position: relative;
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
.element{
	display: flex;
	align-items: center;
}
.element:hover, .clickable:hover{
	background-color: cadetblue;
}
.contextmenu{
	left: 20px;
	display: none;
}
.select:hover .contextmenu{
	display: block;
}
</style>