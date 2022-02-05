<template>
<div id="menus" class="nonprintable">
	<div class="select">
		<div class="kiosk">
			<fa class="img fa_bars" icon="bars" />
			<fa class="img fa_times" icon="times" @click="closeMenus"/>
			<div v-if="!!getActiveKiosk()" class="bold" style="font-size: .8em;">
				{{ getActiveKiosk().nom }}
			</div>
			<fa class="arrow" icon="sort-down"/>
		</div>
		<div class="contextmenu" style="width: 200px;">
			<div class="kioskitem" v-for="kiosk in active_user.kiosks"
			@click="loadKiosk(kiosk)">
				{{ kiosk.nom }}
			</div>
			<hr v-if="user_is_owner">
			<div v-if="user_is_owner"
			@click="$router.push('/magasin/edit').catch(()=>{})">
				Modifier
			</div>
			<div v-if="user_is_owner" @click="deleteKiosk()">
				Supprimer
			</div>
			<hr>
			<div @click="$router.push('/magasin').catch(()=>{})">
				Ajouter Magasin
			</div>
			<hr>
			<div @click="$router.push('/users').catch(()=>{})" v-if="user_is_owner">
				Utilisateurs
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
				<div class="bold">{{ active_user_fullname }}</div>
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
	<router-link to="/pos" v-slot="{ href, navigate, isExactActive }">
		<div class="menu" @click="navigate" :class="{'active':isExactActive}">
			<fa class="img" icon="balance-scale"/>
			<div class="name">Point de Vente</div>
		</div>
	</router-link>
	<div class="deepmenu">
		<fa class="img" style="margin-top: 5px;" icon="list"/>
		<div>
			<div>Historique</div>
			<router-link to="/ventes" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Ventes</div>
				</div>
			</router-link>
			<router-link to="/paiements" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Paiements</div>
				</div>
			</router-link>
		</div>
	</div>
	<div class="deepmenu">
		<fa class="img" style="margin-top: 5px;" icon="chart-bar"/>
		<div>
			<div>Statistiques</div>
			<router-link to="/stat_produits" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Produits</div>
				</div>
			</router-link>
			<router-link to="/stat_clients" v-slot="{ href, navigate, isActive }">
				<div class="element" @click="navigate" :class="{'active':isActive}">
					<fa class="img" icon="long-arrow-alt-right"/>
					<div>Clientèle</div>
				</div>
			</router-link>
		</div>
	</div>
	<router-link to="/produits" v-slot="{ href, navigate, isExactActive }">
		<div class="menu" @click="navigate" :class="{'active':isExactActive}">
			<fa class="img" icon="file-invoice"/>
			<div class="name">Produit</div>
		</div>
	</router-link>
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
	components:{ ContextMenu },
	methods:{
		loadKiosk(kiosk){
			this.$store.state.active_kiosk = kiosk
			this.$store.state.stocks = []
			this.$store.state.produits = []
			this.$store.state.notifs = []
			this.$store.state.attributions = []
			this.$store.state.commandes = []
			this.$store.state.payments = []
			this.$store.state.pertes = []
			this.$store.state.stats_prod = []
			this.$store.state.stats_client = []
			this.$router.push('/').catch(()=>{})
		},
		deleteKiosk(){
			let kiosk = this.getActiveKiosk();
			axios.delete(this.url+`/kiosk/${kiosk.id}/`, this.headers)
			.then((response) => {
				this.$store.state.alert = {
					type:"success",
					message: "le kiosk a été annulé"
				}
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, deleteKiosk)
			})
		},
		closeMenus(){
			menus.style.display = 'none'
		}
	}
};
</script>
<style scoped>
#menus{
	background-color: white;
	min-width: 200px;
	height: 100%;
	overflow: auto;
	box-shadow: 0 0 5px;
	padding-top: 10px;
}
#menus > div{
	padding: 5px 0;
}
.kiosk, .user{
	display: flex;
	align-items: center;
	justify-content: sp;
	margin-top: 10px;
}
.kioskitem{
	color: #05a;
	font-weight: 700;
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
.fa_times{
	display: none;
}
@media only screen and (min-width: 510px) {
    #menus{
    	display: block!important;
    }
}
</style>