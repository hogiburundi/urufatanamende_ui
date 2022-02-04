<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <center>
        <h3>Choisissez</h3>
      </center>
      <form method="post">
        <div v-for="kiosk in active_user.kiosks" class="line">
          <input type="radio" name="selected" :id="kiosk.nom" :value="kiosk" v-model="selected">
          <label :for="kiosk.nom" :class="{'choosed':selected==kiosk}">{{ kiosk.nom }}</label>
        </div>
        <div class="buttons">
          <button type="submit" value="Vendre" @click.stop.prevent="choisir">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    active:{ type:Boolean, default:false}
  },
  data(){
    return {
      selected:null
    }
  },
  methods:{
    choisir(){
      this.$store.state.active_kiosk = this.selected;
    }
  }
};
</script>
<style scoped>
.line input{
  margin-right: 5px;
}
.choosed{
  font-weight: 700;
}
</style>