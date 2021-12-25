<template>
	<div class="alert nonprintable" v-if="visible"
			:class="$store.state.alert.type">
		{{ $store.state.alert.message }}
		<button @click="visible=false">&times</button>
	</div>
</template>
<script >
export default {
	data(){
		return {
			visible:false,
		}
	},
	watch:{
		"$store.state.alert":{
			deep:true,
			handler(new_val){
				if (!!new_val.message) {
					this.visible = true
					setTimeout(() => {
						this.$store.state.alert = {type:"", message:""}
					}, 5000)
				} else {
					this.visible = false
				}
			}
		},
	}
}
</script>
<style scoped>
.alert{
	position: fixed;
	bottom: 30px;
	left: 150px;
	z-index: 5;
	background-color: #48d;
	color: white;
	padding: 5px 35px 5px 5px;
	box-shadow: 3px 3px 5px darkgrey;
	border-radius: 3px;
	min-width: 200px;
	max-width: 500px;
	max-height: 70px;
	overflow: hidden;
}
.alert.success{
	background-color: #272;
}
.alert.danger{
	background-color: #d44;
}
button{
	padding: 0 5px;
	background-color: red;
	position: absolute;
	top: 0px;
	right: 3px;
}
</style>