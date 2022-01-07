<template>
<div class="cart">
	<button class="close" @click="$emit('close')">&times</button>
	<h3>Panier</h3>
	<div class="cart-content">
	  <div class="cart-items">
	    <div v-if="cart.content.length>0">
	      <div class="cart-item" v-for="item in cart.content">
	        <button class="cart_button" 
	          @click="cart.decrease(item.product.id)">-
	        </button>
	        <button class="cart_button" 
	          @click="cart.increase(item.product.id)">+
	        </button>
	        <div class="cart_body">
	          <div>
	            <b>{{ item.quantite }}</b> x {{ item.product.nom }}
	            <fa icon="trash-alt" style="color:#b55"
	              @click="cart.remove(item.product.id)"/>
	          </div>
	          <div>
	            <b>{{ money(item.getTotal()) }}</b> Fbu
	          </div>
	        </div>
	      </div>
	    </div>
	    <div v-else>
	      No content
	    </div>
	  </div>
	  <div class="totals">
	    <div>Totals</div>
	    <div><b>{{ !!cart.getTotal?cart.getTotal():0 }}</b> Fbu</div>
	  </div>
	  <div class="bottom">
	    <div class="buttons">
	      <button @click="cart.content=[]">Reset</button>
	      <button @click="$emit('submit')">Soumettre</button>
	    </div>
	  </div>
	</div>
</div>
</template>
<script >
export default {
	props:["cart"]
};
</script>
<style scoped>
.cart{
  border: 1px solid black;
  width: 400px;
  min-width: 350px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px;
  padding: 10px;
  background-color: var(--primary-light);
  overflow-y: auto;
  position: relative;
}
h3{
  text-align: center;
  margin-bottom: 15px;
}
.totals{
	margin-top: 5px;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-between;
}
.bottom{
  display: flex;
  justify-content: flex-end;
}
button{
  margin: 10px 0 0 10px;
  background-color: var(--primary);
}
.close{
	background-color: red;
	position: absolute;
	top: 2px;
	left: 2px;
}
.cart-content{
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
}
.cart-items{
  flex-grow: 1;
  max-height: calc(100%);
  overflow-y: auto;
}
.cart-item, .cart_body{
  display: flex;
  width: 100%;
  align-items: center;
}
.cart_body{
  justify-content: space-between;
}
.cart-item button{
  margin: 5px 5px 0 0;
}
</style>