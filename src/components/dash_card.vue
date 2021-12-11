<template>
<div class="dash-card">
	<div class="left">
		<fa class="icon" :icon="icegeranyo.icon"/>
		<div class="descr">
			<div>{{ icegeranyo.text }}</div>
			<h3>{{ icegeranyo.value }}</h3>
		</div>
	</div>
	<div class="right">
		<fa icon="bars"/>
	</div>
</div>
</template>
<script>
export default{
	props:["icegeranyo"]
};
</script>
<style scoped>
.dash-card{
	border: 2px solid black;
	padding: 5px;
	display: inline-flex;
}
.left{
	display: flex;
	align-items: center;
	margin-right: 10px;
}
.icon{
	font-size: 1.7em;
	margin: 5px;
}
h3{
	white-space: nowrap;
}
</style>