<template>
<div class="menus">
	<div class="select">
		<div class="kiosk">
			<fa class="img" icon="bars"/>
			<div class="bold" style="font-size: .8em;">Alimentation UMUCO</div>
			<fa class="arrow" icon="sort-down"/>
		</div>
		<div class="contextmenu" style="width: 200px;">
			<div>BIMBO Super Market</div>
			<div>Pharmacie AJENITEKA</div>
			<div>Modifier</div>
			<div>Supprimer</div>
			<div @click="$router.push('/magasin').catch(()=>{})">
				Ajouter Magasin
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
				<div class="bold">Moise NTIRAMPEBA</div>
			</div>
			<fa class="arrow" icon="sort-down"/>
		</div>
		<ContextMenu/>
	</div>
	<router-link to="/" v-slot="{ href, navigate, isExactActive }">
		<div class="menu" @click="navigate" :class="{'active':isExactActive}">
			<fa class="img" icon="tachometer-alt"/>
			<div class="name">Accueil</div>
		</div>
	</router-link>
	<div class="deepmenu">
		<fa class="img" style="margin-top: 5px;" icon="chart-bar"/>
		<div>
			<div>Statistiques</div>
			<router-link to="/stat_ventes" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Ventes</div>
				</div>
			</router-link>
			<router-link to="/stat_dettes" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">		
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Dettes</div>
				</div>
			</router-link>
			<router-link to="/stat_paiements" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Paiements</div>
				</div>
			</router-link>
			<router-link to="/stat_produits" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Produits</div>
				</div>
			</router-link>
			<router-link to="/stat_pertes" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Pertes</div>
				</div>
			</router-link>
		</div>
	</div>
	<router-link to="/stock" v-slot="{ href, navigate, isExactActive }">
		<div class="menu" @click="navigate" :class="{'active':isExactActive}">
			<fa class="img" icon="box"/>
			<div class="name">Stock</div>
		</div>
	</router-link>
	<router-link to="/pertes" v-slot="{ href, navigate, isExactActive }">
		<div class="menu" @click="navigate" :class="{'active':isExactActive}">
			<fa class="img" icon="exclamation-triangle"/>
			<div class="name">Pertes</div>
		</div>
	</router-link>
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
.menu, .deepmenu{
	display: flex;
	align-items: center;
	cursor: default;
}
.deepmenu{
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
.bold{
	font-weight: 700;
}
.arrow{
	font-size: 20px;
}
.element{
	display: flex;
	align-items: center;
	font-size: .8em;
	padding: 3px 10px 3px 3px;
}
.element:hover, .menu:hover{
	background-color: cadetblue;
	color: white;
}
.active{
	font-weight: 700;
}
.contextmenu{
	left: 20px;
	display: none;
}
.select:hover .contextmenu{
	display: block;
}
</style>