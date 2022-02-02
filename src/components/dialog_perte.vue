<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close" @click="$emit('close')">&times</button>
      <center>
        <h3>Perte</h3>
      </center>
      <label v-if="!!item" class="form-item">
        {{ item.stock }}
      </label>
      <form method="post">
        <div class="field">
          <label for="id_quantite">Quantité:</label>
          <input type="number" v-model="quantite">
        </div>
        <div class="field">
          <label for="id_tel">Détails:</label>
          <textarea v-model="details" list="tels" placeholder="expliquez-vous ici!">
          </textarea>
        </div>
        <div class="buttons">
          <button type="submit" @click.prevent="postPerte">Soumettre</button>
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
    item:{ type:Object, default:false},
  },
  data(){
    return {
      quantite:0, details:""
    }
  },
  methods: {
    postPerte(){
      if(this.details.length<32){
        this.$store.state.alert = {
          type:"", message:"la justification doit être faite d'au moins 32 caractères "
        }
        return
      }
      let data = {
        "quantite": this.quantite,
        "details": this.details,
        "stock": this.item.id
      }
      axios.post(this.url+"/perte/", data, this.headers)
      .then((response) => {
        this.item.quantite -= this.quantite
        this.$store.state.pertes.push(response.data)
        this.$emit("close")
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postPerte)
      });
    },
  },
};
</script>
<style scoped>
</style>