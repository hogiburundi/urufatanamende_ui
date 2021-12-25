<template>
	<StatsLayout>
		<div class="import">
			<button>Generer un model</button>
			<button>Charger</button>
		</div>
		<div class="table">
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>nom</th>
					<th>unités</th>
					<th>quantité</th>
					<th class="right">prix de vente</th>
					<th class="right">Valeur</th>
					<th>
						<button @click="addProduct">Ajouter un produit</button>
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="produit in produits">
					<tr @click="folded==produit.id?folded=-1:folded=produit.id">
						<td>{{ produit.id }}</td>
						<td>{{ produit.nom }}</td>
						<td>{{ `${produit.unite}(${produit.rapport} ${produit.unite_entrante})` }}</td>
						<td>{{ produit.quantite }}</td>
						<td class="right">{{ money(produit.prix_vente) }}</td>
						<td class="right">{{ money(produit.prix_vente * produit.quantite)}}</td>
						<td>
							<button @click="editProduct({})">
								Modifier
							</button>
							<button>
								<fa icon="plus"/>
								Stock
							</button>
						</td>
					</tr>
          <tr v-if="folded == produit.id">
            <td></td>
            <td colspan=6>
              <tr>
                <th>qtt. initiale</th>
                <th>prix d'achat</th>
                <th>qtt. restant</th>
                <th>date d'exp.</th>
                <th>user</th>
                <th>validateur</th>
                <th>option</th>
              </tr>
              <tr v-for="achat in produit.achats">
                <td>{{ achat.numeros_initial }}</td>
                <td>{{ money(achat.prix_achat_total) }}</td>
                <td>{{ money(achat.prix_vente_total) }}</td>
                <td>{{ achat.numeros_restant }}</td>
                <td>{{ evaluate(achat.numeros_restant) }}</td>
                <td>
                  <button @click="affecter(achat, produit.is_evd)">
                    <fa icon="people-carry" class="default-fa"/>
                    affectation
                  </button>
                </td>
              </tr>
            </td>
          </tr>
        </template>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="5"></th>
					<th class="right">
					{{ money(
						produits.reduce((acc, x) => {
							return acc + (x.prix_vente * x.quantite)
						}, 0)
					)}}
					</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
		</div>
		<DialogProduit :active="produit_shown" :item="active_product" @close="close"/>
	</StatsLayout>
</template>
<script>
import StatsLayout from "./stats_layout"
import DialogProduit from "../components/dialog_produit"

export default{
	data(){
		return{
			produits:this.$store.state.produits, folded:-1,
			produit_shown:false, active_product:null, next:null,
		}
	},
	watch:{
		"$store.state.produits"(new_val){
			this.produits = new_val
		}
	},
	components:{ StatsLayout, DialogProduit },
	methods:{
		close(){
			this.produit_shown = false
			this.active_product = null
		},
		addProduct(){
			this.produit_shown = true
		},
		editProduct(product){
			this.produit_shown = true
			this.active_product = product
		},
    fetchData(){
      let link = ""
      if(!this.next){
        link = this.url+`/produit/`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.$store.state.produits.push(...response.data.results)
        if(response.data.next.length > 0){
          this.next = response.data.next
          this.fetchData()
        } else {
          this.next = null
        }
      }).catch((error) => {
        this.displaErrorOrRefreshToken(error, this.fetchData)
      });
    },
	},
	mounted(){
    if(this.$store.state.produits.length<1){
      this.fetchData()
    }
	}
};
</script>
<style scoped>
.import *{
	margin: 10px 10px 0 0;
}
.table{
  height: calc(100vh - 150px);
  max-width: 100%;
}
</style>