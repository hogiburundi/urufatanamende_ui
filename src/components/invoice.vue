<template>
<div class="printable invoice">
    <center class="header">
        <img width=100 :src="getActiveKiosk().logo" style="display:block" />
        <div v-if="commande">
            Facture no. {{commande.id}} du {{datetime(commande.date)}}<br>
        </div>
        <div style="text-align: left; display: inline-block;">
            RC 23606/20<br />
            NIF 4001409707
        </div>
        <div>
            {{ getActiveKiosk().tel }}<br />
            {{ getActiveKiosk().nom }}<br />
            {{ getActiveKiosk().details }}
        </div>
        <div v-if="commande"><b>{{ commande.client }}</b></div>
    </center>
    <table style="width:100%;">
        <tbody v-if="commande">
            <tr style="border-bottom: 1px solid #aaa;text-align: left;">
                <th>Article</th>
                <th style="">P.U.</th>
                <th>Qt.</th>
                <th style="text-align: right;">Total</th>
            </tr>
            <tr style="text-align: left;" v-for="item in commande.ventes">
                <td>{{ item.produit }}</td>
                <td>{{ item.prix_unitaire }} Fbu</td>
                <td>x {{ item.quantite }}</td>
                <td style="text-align: right;">{{ item.prix_total }} Fbu</td>
            </tr>
            <tr style="border-top: 1px solid #aaa;text-align: left;">
                <th colspan="3">Total</th>
                <th style="text-align: right;"><b>{{ money(commande.prix) }} Fbu</b></th>
            </tr>
        </tbody>
    </table>
    <div style="margin:10px" v-if="commande">
        Caissier: {{ commande.user }}
    </div>
    <center>
    	<strong>Murakoze, Merci, Thank you!</strong>
    </center>
</div>
</template>
<script>
export default {
	props:["commande"],
    data(){
        return {
            ventes:[]
        }
    }
};
</script>
<style scoped>
*{
	margin: 0;
}
.header *{
	margin: 10px 0;
}
@media print{
    .invoice{
        background-color: white;
        position: fixed;
        width: 100%;
    }
}
</style>