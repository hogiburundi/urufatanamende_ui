<template>
<div class="stats">
	<div class="topbar">
		<div class="sv">
			<fa icon="search"/>
			<input type="text" placeholder="search">
		</div>
		<input type="date" name="">
		<button>Appliquer</button>
	</div>
	<slot/>
</div>
</template>
<script>
export default{
	data(){
		return{}
	},
	methods:{
	}
};
</script>
<style scoped>
.stats{
	margin: 20px;
}
.topbar{
	display: flex;
}
.topbar > *{
	margin-right: 10px;
}
table{
	margin: 0;
	width: 100%;
}
</style>