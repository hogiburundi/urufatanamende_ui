import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Magasin from '../views/Magasin.vue'
import Users from '../views/Users.vue'
import Notifications from '../views/Notifications.vue'
import Notification from '../views/Notification.vue'
import Stock from '../views/Stock.vue'
import Pertes from '../views/Pertes.vue'
import Ventes from '../views/Ventes.vue'
import StatDettes from '../views/StatDettes.vue'
import Paiements from '../views/Paiements.vue'
import StatProduits from '../views/StatProduits.vue'
import StatClient from '../views/StatClient.vue'
import POS from '../views/POS.vue'
import Produit from '../views/Produit.vue'
import Versement from '../views/Versement.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/pos', name: 'POS', component: POS},
  { path: '/magasin', name: 'Magasin', component: Magasin},
  { path: '/magasin/edit', name: 'Magasin', component: Magasin},
  { path: '/users', name: 'Users', component: Users},
  { path: '/notifs', name: 'Notifications', component: Notifications},
  { path: '/notifs/:id', name: 'Notification', component: Notification},
  { path: '/stock', name: 'Stock', component: Stock},
  { path: '/pertes', name: 'Pertes', component: Pertes},
  { path: '/ventes', name: 'Ventes', component: Ventes},
  { path: '/produits', name: 'Produit', component: Produit},
  { path: '/stat_dettes', name: 'StatDettes', component: StatDettes},
  { path: '/paiements', name: 'Paiements', component: Paiements},
  { path: '/stat_produits', name: 'StatProduits', component: StatProduits},
  { path: '/stat_clients', name: 'StatClient', component: StatClient},
  { path: '/versements', name: 'Versement', component: Versement},
]

const router = new VueRouter({
  routes
})

export default router
