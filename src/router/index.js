import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const subPath = process.env.VUE_APP_SUB_PATH;

const routes = [
  {
    path: `${subPath}`,
    name: 'Home',
    component: Home
  },
  {
    path: `${subPath}/verify`,
    name: 'VerifyDiplomaPage',
    component: () => import('../views/VerifyDiplomaPage.vue')
  },
  {
    path: `${subPath}/admin`,
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'diplomas',
        component: () => import('../components/table/AdminTable.vue'),
        name: 'diplomas'
      },
      {
        path: 'users',
        component: () => import('../components/table/AdminTableUser.vue'),
        name: 'users'
      }
    ]
  },
  {
    admin: `${subPath}/principal`,
    name: 'Principal',
    component: () => import ('../views/Principal.vue'),
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
