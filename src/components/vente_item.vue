<template>
	<div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
		<span class="name" style="flex-grow: 1;">{{ item.nom }}</span>
			<div class="prix">
			<b>{{ money(item.prix_vente) }} Fbu</b> <span>| dispo:</span>
			<span class="dispo">
				{{item.quantite || 0}} {{item.unite_sortante}}
			</span>
		</div>
		<div class="buttons">
			<button class="bg-blue" @click="decreaseQtt">-</button>
			<input v-if="editable" type="number" class="item_qtt"
				v-model="qtt" @keydown.stop :max="item.quantite" min="0">
			<label v-else @click="enableEdition">{{qtt}}</label>
			<button class="bg-blue" @click="increaseQtt">+</button>
		</div>
	</div>
</template>
<script >
export default {
	props: {
		item:{type:Object, required:true}
	},
	data(){
		return {
			cart : this.$store.state.cart,
			editable:false
		}
	},
	methods: {
		getIcon(item){
			if (item.image == null) {
				return "/img/item.png";
			}
			return item.image;
		},
		increaseQtt : function(){
			this.cart.add(this.item);
		},
		decreaseQtt : function(){
			this.cart.decrease(this.item.id);
		},
		enableEdition(){
			if(this.item.quantite!=0) this.editable=true
		}
	},
	computed:{
		qtt:{
			get(){
				return this.cart.getQuantite(this.item.id);
			},
			set(value){
				if(value.length==0) return;
				this.cart.add(this.item, value);
			}
		}
	}
};
</script>
<style scoped>
*{
	color: #eee; 
}
.img{
	padding: 5px;
	color:#aaa;
}
.danger *{
	color: #444!important;
	border-color: var(--primary);
	cursor: not-allowed;
}
.danger .bg-blue:hover{
	background-color: var(--primary);
	color:inherit;
}
.danger .buttons{
	border-top: 1px solid var(--overlay-color);
}
.parent{
	background-color: var(--primary-light);
    padding: 3px;
	text-align: center;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--primary-light);
	/*max-width: 200px;*/
	height: 100%;
	max-height: 100px;
}
.name{
	font-size: .9em;
	font-weight: 700;
	width: 100%;
}
.prix{
	font-size: .8em;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin: 4px 0;
	color: white!important;
}
.prix b{
	color: white;
}
.qtt{
	font-size: .7em;
	margin-bottom: 2px;
}
.buttons{
	display: flex;
	margin-top: 2px;
	border-top: 1px solid black;
	width: 100%;
}
button{
	border: 0;
	background-color: var(--primary-light);
}
.bg-blue{
	width: 35%;
	padding: 3px;
	margin: 0;
	text-align: center;
	border-radius: 0;
	font-weight: bold;
	font-size: 20px;
}
label{
	flex-grow: 1;
	background-color: white;
	color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-top: 0;
}
.bg-blue:hover{
	background-color: var(--primary);
	color: white;
}
.item_qtt{
	text-align: center;
	width: 70px;
    border-top: 0;
    padding-right: -5px;
}
.dispo{
	color: #fff;
	padding: 2px 5px;
	background-color: var(--primary);
	font-weight: bold;
	font-size: .9em;
	display: inline-block;
	max-width: 90px;
	overflow: hidden;
	margin-bottom: -4px;
}
.danger .dispo{
	background-color: #0000;
}
</style>