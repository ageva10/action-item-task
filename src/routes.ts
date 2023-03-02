import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        name: 'ScreenOne',
        component: () => import('./views/ScreenOne.vue')
      },
      {
        path: ':uuid',
        name: 'ScreenTwo',
        component: () => import('./views/ScreenTwo.vue'),
        beforeEnter (to: any, from: any, next: (p?: string) => void) {
          if (localStorage.has('user')) {
            const uuid = localStorage.get('user').login.uuid
            if (to.params.uuid === uuid) {
              return next()
            }
          }
          next('/')
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router