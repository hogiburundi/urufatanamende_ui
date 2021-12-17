<template>
<div class="home">
	<div class="ivyegeranyo">
		<DashCard 
			v-for="icegeranyo in ivyegeranyo"
			:icegeranyo="icegeranyo"
		/>	
	</div>
	<div class="legends">
		<div class="ventes">
			<div>
				<select class="end">
					<option>28 jours</option>
					<option>7 jours</option>
					<option>1 jour</option>
					<option>imprimer</option>
				</select>
				<h3>Meilleur ventes</h3>
			</div>
			<div class="table">
				<table>
					<tr v-for="vente, i in ventes">
						<td><b>{{ i+1 }}</b></td>
						<td>{{ vente.quantite }}</td>
						<td>{{ vente.produit }}</td>
						<td>{{ datetime(vente.date) }}</td>
						<td>{{ money(vente.prix_total) }} FBu</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="charts">
			<div class="top">
				<select >
					<option>28 jours</option>
					<option>7 jours</option>
					<option>1 jour</option>
					<option>imprimer</option>
				</select>
				<div class="content">
					<div class="pie">
						<div class="percent">55%</div>
					</div>
					<div class="legend">
						<b>Ecoulement stock</b>
						<div>45% stock restant</div>
						<div>55% ventes</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<select >
					<option>28 jours</option>
					<option>7 jours</option>
					<option>1 jour</option>
					<option>imprimer</option>
				</select>
				<div class="content">
					<fa class="icon" icon="smile-wink"/>
					<div class="legend">
						<b>Clients</b>
						<div>15, 489</div>
						<div>40% d'augmentation</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import DashCard from "../components/dash_card"
export default{
	components:{DashCard,},
	data(){
		return {
			ventes:[],
			ivyegeranyo:[
				{icon:"chart-bar", text:"Intérêts", value:"2,000,547"},
				{icon:"money-bill-alt", text:"Invest", value:"95,000,000"},
				{icon:"shopping-cart", text:"ventes", value:"9,580,150"},
				{icon:"database", text:"Produits", value:"954"}
			]
		}
	},
	methods:{
		fetchData(){
			let kiosk_id = this.getActiveKiosk().id
			axios.get(this.url+`/vente/?commande__kiosk=${kiosk_id}`, this.headers)
			.then((response) => {
				this.ventes = response.data.results;
			}).catch((error) => {
				if(error.response.status==401){
					this.refreshToken(this.fetchData)
				}
				this.logs = error.response.data;
				console.error(error)
			})
		},
	},
	mounted(){
		this.fetchData()
	},
};
</script>
<style scoped>
.home{
	padding: 20px;
	height: 100%;
}
.ivyegeranyo{
	display: flex;
	justify-content: flex-start;
	width: 100%;
	overflow: auto;
}
.ivyegeranyo > *{
	margin: 0 10px 10px 0;
}
.legends{
	display: flex;
	max-height: calc(100% - 110px);
}
.legends > div{
	flex-grow: 1;
}
.ventes, .top, .bottom{
	border: 2px solid black;
	position: relative;
}
.ventes{
	margin-right: 20px;
	padding: 0 0 0 20px;
	max-height: calc(100% - 110px);
}
.top{
	margin-bottom: 20px;
}
select{
	margin: 5px;
	position: absolute;
	right: 0;
}
td{
	padding: 0;
	height: inherit;
	white-space: nowrap;
}
.table{
	margin-top: 10px;
	padding-bottom: 20px;
	width: 100%;
	height: calc(100% - 35px);
	overflow: auto;
}
.content{
	margin-top:  20px;
	display: flex;
	overflow: hidden;
	align-items: center;
}
.pie {
	width: 60px;
	min-width: 60px;
	height: 60px;
	background-image: conic-gradient(#aaa 55%, #777 45%);
	border-radius: 50%;
	display: flex ;
	justify-content: center;
	align-items: center;
	border: 2px solid black;
	margin: 10px;
}
.pie div{
	background-color: white;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex ;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	font-size: .8em;
	font-weight: 700;
}
.legend div{
	font-size: .7em;
}
.content .icon{
	font-size: 4em;
	margin: 10px;
}
</style>