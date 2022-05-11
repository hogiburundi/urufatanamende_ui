<template>
  <div :class="{popup:true, active:active}">
	<div class="popup-body">
		<button class="close nonprintable" @click="$emit('close')">&times</button>
		<center class="nonprintable">
			<h3 style="margin-bottom: 10px;">PRODUITS VENDUES</h3>
		</center>
		<div class="params nonprintable">
			<label for="nombre">nombre</label>
			<input type="number" v-model="nombre">
			<button @click="imprimer">imprimer</button>
		</div>
		<div class="page">
			<span v-for="produit in items">
				<div class="qr_item" v-for="i in parseInt(nombre)">
					<center v-if="produit">
						<div class="barcode">*{{
							produit.id.toLocaleString('fr-FR', {
								minimumIntegerDigits: 2, useGrouping:false
							})
						}}*
						</div>
						<div class="nom">{{produit.nom}}</div>
					</center>
				</div>
			</span>
		</div>
	</div>
  </div>
</div>
</template>
<script>
export default {
	props:["items", "active"],
	data(){
		return {
			nombre:7
		}
	},
	methods:{
		imprimer(){
			window.print()
		},
	}
};
</script>
<style scoped>
.params>*{
	margin-right: 5px;
}
.qr_item{
	max-width: 150px;
	display: inline-block;
	border-bottom: 1px dotted gray;
	border-right: 1px dotted gray;
	margin: 5px 0;
	padding: 0 5px;
}
.nom{
	font-size: .8em;
}
.barcode{
	font-family: ccode39;
	font-size: 1.2em;
}
.page{
	border: 1px solid black;
	width: 210mm;
	padding: 10px;
	margin-top: 10px;
	overflow: hidden;
}
@media print {
	.page{
		border-width: 0;
	}
	.popup-body {
		position: relative;
		max-height: auto !important;
		overflow: visible;
	}
	.popup{
		position: absolute;
		height: auto;
		overflow-y: visible;
	}

}
</style>