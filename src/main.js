import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components'
import '@/assets/style/public.scss'

import 'flex.css'

import {
  Calendar,
  Tabbar,
  TabbarItem,
  NavBar,
  Switch,
  Field,
  Cell,
  CellGroup
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Calendar)
Vue.use(NavBar)
Vue.use(Switch)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('RECALCULATION')
  }
}).$mount('#app')
