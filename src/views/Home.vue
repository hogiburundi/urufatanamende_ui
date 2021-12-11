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
					<tr v-for="i in 20">
						<td>{{ i }}</td>
						<td>Amata</td>
						<td>20 Nov 2019 at 06:00 PM </td>
						<td>2 000</td>
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
				<h3>Ecoulement stock</h3>
			</div>
			<div class="bottom">
				<select >
					<option>28 jours</option>
					<option>7 jours</option>
					<option>1 jour</option>
					<option>imprimer</option>
				</select>
				<h3>Clients</h3>
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
			ivyegeranyo:[
				{icon:"chart-bar", text:"Intérêts", value:"2,000,547"},
				{icon:"money-bill-alt", text:"Invest", value:"95,000,000"},
				{icon:"shopping-cart", text:"ventes", value:"9,580,150"},
				{icon:"database", text:"Produits", value:"954"}
			]
		}
	}
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
	padding-right: 10px;
}
.table{
	margin-top: 10px;
	padding-bottom: 20px;
	width: 100%;
	height: calc(100% - 35px);
	overflow: auto;
}
</style>