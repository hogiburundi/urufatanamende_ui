import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Magasin from '../views/Magasin.vue'
import User from '../views/User.vue'
import Notifications from '../views/Notifications.vue'
import Notification from '../views/Notification.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/magasin', name: 'Magasin', component: Magasin},
  { path: '/user', name: 'User', component: User},
  { path: '/notifs', name: 'Notifications', component: Notifications},
  { path: '/notif/:id', name: 'Notification', component: Notification},
]

const router = new VueRouter({
  routes
})

export default router
