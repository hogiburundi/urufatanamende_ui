import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Magasin from '../views/Magasin.vue'
import User from '../views/User.vue'
import Notifications from '../views/Notifications.vue'
import Notification from '../views/Notification.vue'
import Stock from '../views/Stock.vue'
import Pertes from '../views/Pertes.vue'
import StatVentes from '../views/StatVentes.vue'
import StatDettes from '../views/StatDettes.vue'
import StatPaiements from '../views/StatPaiements.vue'
import StatProduits from '../views/StatProduits.vue'
import StatPertes from '../views/StatPertes.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/magasin', name: 'Magasin', component: Magasin},
  { path: '/magasin/edit', name: 'Magasin', component: Magasin},
  { path: '/user', name: 'User', component: User},
  { path: '/notifs', name: 'Notifications', component: Notifications},
  { path: '/notifs/:id', name: 'Notification', component: Notification},
  { path: '/stock', name: 'Stock', component: Stock},
  { path: '/pertes', name: 'Pertes', component: Pertes},
  { path: '/stat_ventes', name: 'StatVentes', component: StatVentes},
  { path: '/stat_dettes', name: 'StatDettes', component: StatDettes},
  { path: '/stat_paiements', name: 'StatPaiements', component: StatPaiements},
  { path: '/stat_produits', name: 'StatProduits', component: StatProduits},
  { path: '/stat_pertes', name: 'StatPertes', component: StatPertes},
]

const router = new VueRouter({
  routes
})

export default router
