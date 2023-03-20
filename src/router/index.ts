import { createRouter, createWebHistory } from 'vue-router'
import remainingRouter from "@/router/modules/remaining";
import {SessionStorage} from "@/util/storageTool"
import home from "@/router/modules/home";


const sessionStorage = new SessionStorage()
const allRouter = [...remainingRouter, ...home,]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: allRouter
})

router.beforeEach((to, from, next) => {
  // if (allRouter.find(item => item.path === to.path)) {
  //   if (to.name === 'Error') {
  //     next()
  //   }
  //
  //   if (!storageSession.getItem('user-info')) {
  //     if (to.name === 'Login') {
  //       next()
  //     } else {
  //       next({name: 'Login'})
  //     }
  //   } else {
  //     if (to.name === 'Login') {
  //       router.push(from.fullPath)
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   next({path: '/error'})
  // }
  if (to.name === 'Error') {
    next()
  }

  if (!sessionStorage.getItem('user-info')) {
    if (to.name === 'Login') {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    if (to.name === 'Login') {
      router.push(from.fullPath)
    } else {
      next()
    }
  }
})

export default router
