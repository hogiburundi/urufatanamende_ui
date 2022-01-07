<template>
<div class="printable invoice" v-if="commande.infos">
    <center class="header">
        <img width=100 src="/static/logo.png" style="display:block" />
        <div>
            Facture no. {{commande.infos.id}} du {{datetime(commande.infos.date)}}<br>
        </div>
        <div style="text-align: left; display: inline-block;">
            RC 23606/20<br />
            NIF 4001409707
        </div>
        <div>
            Tel: 61 977 004 / 71 369 548<br />
            BIMBO General Trading (BGT)<br />
            Bujumbura, Gihosha
        </div>
        <div><b>{{ commande.infos.client }}</b></div>
    </center>
    <table style="width:100%;">
        <tbody>
            <tr style="border-bottom: 1px solid #aaa;text-align: left;">
                <th>Article</th>
                <th style="">P.U.</th>
                <th>Qt.</th>
                <th style="text-align: right;">Total</th>
            </tr>
            <tr style="text-align: left;" v-for="item in commande.ventes">
                <td>{{ item.product.nom }}</td>
                <td>{{ item.product.prix_vente }} Fbu</td>
                <td>x {{ item.quantite }}</td>
                <td style="text-align: right;">{{ item.getTotal() }} Fbu</td>
            </tr>
            <tr style="border-top: 1px solid #aaa;text-align: left;">
                <th colspan="3">Total</th>
                <th style="text-align: right;"><b>{{ commande.infos.prix }} Fbu</b></th>
            </tr>
        </tbody>
    </table>
    <div style="margin:10px">
        Caissier: {{ !!commande.infos.user?commande.infos.user.fullname:"" }}
    </div>
    <center>
    	<strong>Murakoze, Merci, Thank you!</strong>
    </center>
</div>
</template>
<script>
export default {
	data(){
		return {
			commande : this.$store.state.commande
		}
	},
	watch:{
		"$store.state.commande":{
			deep:true,
			handler(new_val){
				console.log('something changed')
				this.commande =  this.$store.state.commande
			}
		}
	}
};
</script>
<style scoped>
.invoice{
	position: fixed;
}
*{
	margin: 0;
}
.header *{
	margin: 10px 0;
}
</style>