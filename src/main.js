import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pluginEnv from '@/plugin/env'
import '@/components'
import '@/filters'
import '@/assets/style/public-class.scss'

import 'flex.css'

import {
  Calendar,
  Tabbar,
  TabbarItem,
  NavBar,
  Switch,
  Field,
  Cell,
  CellGroup,
  Divider,
  Stepper
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Calendar)
Vue.use(NavBar)
Vue.use(Switch)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Divider)
Vue.use(Stepper)

Vue.use(pluginEnv)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
