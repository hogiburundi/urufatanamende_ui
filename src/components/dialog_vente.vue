<template>
  <div :class="['popup', 'nonprintable', {'active':active}]">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3>Paiement</h3>
      </center>
      <form method="post">
        <div>
          La somme à payer <b>{{money(cart.getTotal()) }}</b>Fbu
        </div>
        <div class="field">
          <label for="id_somme">La somme payée:</label>
          <input type="number" id="id_somme" v-model="payee" step="100">
        </div>
        <div>
          La somme 
          <span v-if="payee >= cart.getTotal()">à lui retourner</span>
          <b v-else>restante</b>
          est de: <b>{{ money(Math.abs(payee - cart.getTotal())) }}</b> Fbu
        </div>
        <hr>
        <div>
          <input type="checkbox" id="is_client_new" v-model="is_client_new">
          <label for="is_client_new"> C'est un nouveau client:</label>
        </div>
        <div class="field" v-if="!is_client_new">
          <label for="keyword">Nom du client:</label>
          <div class="searchable">
            <input type="text" id="keyword" placeholder="keyword" v-model="keyword">
            <button @click.prevent="search">search</button>
          </div>
          <div class="logs">
            {{ logs }}
          </div>
        </div>
        <div v-if="is_client_new">
          <div class="field">
            <label for="id_nom">Nom du client</label>
            <input type="text" list="noms" v-model="client.nom"
              id="id_nom" @change="setTel">
          </div>
          <div class="field">
            <label for="id_tel">Téléphone</label>
            <input type="number" v-model="client.tel" id="id_tel"
               list="tels" @change="setNom">
          </div>
          <div class="field">
            <label position="floating">Invoice Type</label>
            <select @v-model="invoice_type">
              <option value="FN">
                Facture normale
              </option>
              <option value="RC">
                Remboursement caution
              </option>
              <option value="RHF">
                Réduction Hors Facture
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">VAT Taxpayer</label>
            <select @v-model="vat_taxpayer">
              <option value="0">
                Non assujetti à la TVA
              </option>
              <option value="1">
                Assujetti à la TVA
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">CT Taxpayer</label>
            <select @v-model="ct_taxpayer">
              <option value="0">
                Non Assujetti à la taxe de consommation
              </option>
              <option value="1">
                Assujetti à la taxe de consommation
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">TL Taxpayer</label>
            <select @v-model="tl_taxpayer">
              <option value="0">
                Non Assujetti au prélèvement forfaitaire libératoire
              </option>
              <option value="1">
                Assujetti au prélèvement forfaitaire libératoire
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">Payment Type</label>
            <select @v-model="payment_type">
              <option value="1">
                en espèce
              </option>
              <option value="2">
                banque
              </option>
              <option value="3">
                à crédit
              </option>
              <option value="4">
                autres
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">Invoice Currency</label>
            <select @v-model="invoice_currency">
              <option value="BIF">
                Franc Burundais
              </option>
              <option value="USD">
                United State Dollar
              </option>
              <option value="EUR">
                EURO
              </option>
            </select>
          </div>
          <div class="field">
            <label position="floating">Customer Name</label>
            <input type="text" 
              placeholder="Customer Name"
              @v-model="customer_name"
              clearInput/>
          </div>
          <div class="field">
            <label position="floating">Customer TIN</label>
            <input type="text" 
              placeholder="Customer TIN"
              @v-model="customer_TIN"
              clearInput/>
          </div>
          <div class="field">
            <label position="floating">Customer Address</label>
            <input type="text" 
              placeholder="Customer Address"
              @v-model="customer_address"
              clearInput/>
          </div>
          <div class="field">
            <label position="floating">VAT Customer Payer</label>
            <select @v-model="vat_customer_payer">
              <option value="0">
                Non assujetti à la TVA
              </option>
              <option value="1">
                assujetti à la TVA
              </option>
            </select>
          </div>
        </div>
        <div class="buttons">
          <button type="submit" value="Vendre"
            @click.prevent="postCommande">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    active:{ type:Boolean, default:false},
  },
  data(){
    return {
      client:{ nom:"", tel:""},
      cart: this.$store.state.cart,
      dette_p:null,
      logs:"",
      is_client_new:false,
      keyword:"",
      
      invoice_type: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      payment_type: "",
      invoice_currency: "",
      customer_name: "",
      customer_TIN: "",
      customer_address: "",
      vat_customer_payer: ""
    }
  },
  watch:{
    active(new_val){
      if(new_val){
        this.$store.state.commande = null;
      }
    }
  },
  computed:{
    payee:{
      get(){
        return this.dette_p == null ? this.cart.getTotal() : this.dette_p
      },
      set(val){
        this.dette_p = val
      }
    },
    clients(){
      return this.$store.state.clients
    },
    host(){
      return this.$store.state.url
    },
    username(){
      return this.$store.state.user.username
    }
  },
  mounted(){
  },
  methods: {
    close(){
      this.client = { nom:"", tel:""}
      this.dette_p = null
      this.logs = ""
      this.is_client_new = false
      this.keyword = ""
      this.$emit("close")
    },
    setTel(){
      for(let client of this.clients){
        if (client.nom == this.client.nom) {
          this.client.tel = client.tel;
          return;
        }
      }
    },
    setNom(){
      for(let client of this.clients){
        if (client.tel == this.client.tel) {
          this.client.nom = client.nom;
          return;
        }
      }
    },
    search(){
      if(!this.keyword){
        this.logs = "* le champ est obligatoire"
        return
      }
      this.logs = "recherche en cours ..."
      axios.get(this.url+`/client/?search=${this.keyword}`, this.headers)
      .then((response) => {
        let results = response.data.results
        if(results.length == 0){
          this.logs = "aucun client trouvé"
        } else if(results.length > 1){
          this.logs = "le resultat est flou"
        } else {
          console.log('OK')
          this.logs = `${results[0].nom} : ${results[0].tel}`
          this.client = results[0]
        }
      }).catch((error) => {
        this.logs = this.cleanString(error.response.data)
      });
    },
    postCommande(){
      if(this.payee < this.cart.getTotal()){
        if(this.client.tel.length<7){
          this.$store.state.alert = {
            type:"danger", message:"le numero de telephone est obligatoire pour les dettes"
          }
          return;
        }
      }
      let data = {};
      let items = [];
      let tva = 0

      let client;
      if(!!this.client.nom){
        client = {
          "nom":this.client.nom,
          "tel":this.client.tel,
          "invoice_type": this.invoice_type,
          "vat_taxpayer": this.vat_taxpayer,
          "ct_taxpayer": this.ct_taxpayer,
          "tl_taxpayer": this.tl_taxpayer,
          "vat_taxpayer": this.vat_taxpayer,
          "ct_taxpayer": this.ct_taxpayer,
          "tl_taxpayer": this.tl_taxpayer,
          "payment_type": this.payment_type,
          "invoice_currency": this.invoice_currency,
          "customer_name": this.customer_name,
          "customer_TIN": this.customer_TIN,
          "customer_address": this.customer_address,
          "vat_customer_payer": this.vat_customer_payer
        }
      }

      for(let item of this.cart.content){
        tva = item.product.prix * item.product.tva /100
        items.unshift({
          "produit":item.product.id,
          "quantite":item.quantite

          "item_designation": item.product.nom,
          "item_quantity": item.quantite,
          "item_price": item.product.prix,
          "item_ct": item.product.item_ct,
          "item_tl": item.product.item_tl,
          "item_price_nvat": item.product.prix - tva,
          "vat": tva,
          "item_price_wvat": item.product.prix + tva,
          "item_total_amount": item.product.prix * item.quantite
        })
      }
      let payee = this.payee<=this.cart.getTotal()?this.payee:this.cart.getTotal()

      let date = new Date().toISOString().replace("T", " ").split(".")[0]
      let str_date = date.replaceAll(":","").replaceAll("-","").replaceAll(" ","")
      let year = new Date().getFullYear()
      let invoice_number = `${id}/${year}`
      let username = this.active_user.username

      obr_data = {
        "invoice_type": client.invoice_type,
        "invoice_date": date,
        "invoice_type": client.invoice_type,

        "tp_type": this.active_kiosk.tp_type,
        "tp_name": this.active_kiosk.tp_name,
        "tp_TIN": this.active_kiosk.tp_TIN,
        "tp_trade_number": this.active_kiosk.tp_trade_number,
        "tp_postal_number": this.active_kiosk.tp_postal_number,
        "tp_phone_number": this.active_kiosk.tp_phone_number,
        "tp_address_province": this.active_kiosk.tp_address_province,
        "tp_address_commune": this.active_kiosk.tp_address_commune,
        "tp_address_quartier": this.active_kiosk.tp_address_quartier,
        "tp_address_avenue": this.active_kiosk.tp_address_avenue,
        "tp_address_number": this.active_kiosk.tp_address_number,
        "tp_fiscal_center": this.active_kiosk.tp_fiscal_center,
        "tp_activity_sector": this.active_kiosk.tp_activity_sector,
        "tp_legal_form": this.active_kiosk.tp_legal_form,

        "vat_taxpayer": client.vat_taxpayer,
        "ct_taxpayer": client.ct_taxpayer,
        "tl_taxpayer": client.tl_taxpayer,
        "vat_taxpayer": client.vat_taxpayer,
        "ct_taxpayer": client.ct_taxpayer,
        "tl_taxpayer": client.tl_taxpayer,
        "payment_type": client.payment_type,
        "invoice_currency": client.invoice_currency,
        "customer_name": client.customer_name,
        "customer_TIN": client.customer_TIN,
        "customer_address": client.customer_address,
        "vat_customer_payer": client.vat_customer_payer

        "cancelled_invoice_ref": this.cancelled_invoice_ref,
        "invoice_ref": id,
        "invoice_signature": `${this.NIF}/${username}/${str_date}/${invoice_number}`,
        "invoice_signature_date": date,

        "invoice_items": items
      };
      if(data.ventes.length==0){
        this.$store.state.alert = {
          type:"danger", message:"le panier est vide"
        }
        return;
      }


        // "ventes":items, "payee":payee,
        // "kiosk":this.getActiveKiosk().id,
        // "client": client,
        
      axios.post(this.url+"/commande/", data, this.headers)
      .then((response) => {
        this.$store.state.commande = response.data;
        this.$store.state.commandes.unshift(response.data);
        for(let item of this.cart.content){
          item.product.quantite -= item.quantite
        }
        this.cart.content = []
        setTimeout(print, 100)
        this.close()
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postCommande)
      });
    },
  }
};
</script>
<style scoped>
</style>