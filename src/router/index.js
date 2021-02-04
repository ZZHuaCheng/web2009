import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/Homepage/Home.vue'
import Layout from "../views/layout.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "Layout",
    component: Layout,
    children: [{
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          isLogin: true
        }
      },
      {
        path: "product",
        name: "Product",
        component: () => import("../views/main/Product"),
        isLogin: true
      },

      {
        path: "params",
        name: "Params",
        component: () => import("../views/main/Params"),
        meta: {
          isLogin: true
        }
      },
      {
        path: "ad",
        name: "ADCategory",
        component: () => import("../views/main/ADCategory"),
        meta: {
          isLogin: true
        }
      },
      {
        path: "details",
        name: "Details",
        component: () => import("../views/main/Homepage/sub/Details.vue"),
        children: [{
            path: "openproduct",
            name: "OpenProduct",
            component: () => import("../views/main/Homepage/sub/openproduct.vue")
          },
          {
            path: "golife",
            name: "golife",
            component: () => import("../views/main/Homepage/sub/golife.vue")
          },
          {
            path: "heigh",
            name: "heigh",
            component: () => import("../views/main/Homepage/sub/heigh.vue")
          },
          {
            path: "logo",
            name: "logo",
            component: () => import("../views/main/Homepage/sub/logo.vue")
          }
        ]
      }

    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router