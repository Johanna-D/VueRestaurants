import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from "vue-router"
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import VueSimpleAlert from "vue-simple-alert";

import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import HelloWorld from './components/HelloWorld.vue'
import Restaurant from './components/Restaurant.vue'
import Menu from './components/Menu.vue'
import Commande from './components/Commande.vue'
import Panier from './components/Panier.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueSimpleAlert)
Vue.config.productionTip = false


const router = new VueRouter ({
  routes: [
    {
      path: '/',
      component: ListeDesRestaurants
    },
    {
      path: '/restaurant/:id',
      component: Restaurant
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/commande',
      component: Commande
    },
    {
      path: '/panier',
      name: 'Panier',
      component: Panier
    },
    {
      path: '/hello',
      component: HelloWorld,
      props : {
        msg : "Hello everyone !"
      }
    }
  ],
  mode: 'history'
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
