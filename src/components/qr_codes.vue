<template>
  <div :class="{popup:true, active:active}">
    <div class="popup-body">
      <button class="close nonprintable" @click="$emit('close')">
        &times
      </button>
      <center class="nonprintable">
        <h3 style="margin-bottom: 10px;">PRODUITS VENDUES</h3>
      </center>
      <center class="nonprintable">
        <button @click="imprimer">
          imprimer
        </button>
      </center>
    </div>
  </div>
</div>
</template>
<script>
export default {
	props:["produit", "active"],
    data(){
        return {
            ventes:[]
        }
    },
    methods:{
        imprimer(){
            window.print()
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