<template>
<div class="dash-card">
	<div class="left">
		<fa class="icon" :icon="icegeranyo.icon"/>
		<div class="descr">
			<div>{{ icegeranyo.text }}</div>
			<b>{{ icegeranyo.value }}</b>
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
b{
	white-space: nowrap;
}
</style>