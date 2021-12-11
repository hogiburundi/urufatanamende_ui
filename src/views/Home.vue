<template>
<div class="home">
	<div class="ivyegeranyo">
		<DashCard 
			v-for="icegeranyo in ivyegeranyo"
			:icegeranyo="icegeranyo"
		/>	
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
}
.ivyegeranyo{
	display: flex;
	justify-content: space-between;
	width: 100%;
	overflow: auto;
}
.ivyegeranyo *{
	margin: 0 10px 10px 0;
}
</style>