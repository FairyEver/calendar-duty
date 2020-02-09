import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: layout,
    children: [
      {
        path: '',
        name: 'calendar',
        component: () => import('@/views/calendar.vue'),
        meta: {
          title: '日历'
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/setting.vue'),
        meta: {
          title: '设置'
        }
      },
      {
        path: 'setting-plan/:index',
        name: 'setting-plan',
        component: () => import('@/views/setting-plan.vue'),
        props: true,
        meta: {
          title: '任务设置',
          back: {
            title: '设置',
            to: {
              name: 'setting'
            }
          }
        }
      },
      {
        path: 'setting-display-calendar',
        name: 'setting-display-calendar',
        component: () => import('@/views/setting-display-calendar.vue'),
        meta: {
          title: '日历显示设置',
          back: {
            title: '设置',
            to: {
              name: 'setting'
            }
          }
        }
      },
      {
        path: 'setting-version',
        name: 'setting-version',
        component: () => import('@/views/setting-version.vue'),
        meta: {
          title: '版本信息',
          back: {
            title: '设置',
            to: {
              name: 'setting'
            }
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
