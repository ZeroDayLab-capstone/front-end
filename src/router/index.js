// src/router/index.js
import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

// 라우트 목록 (routes.js) 불러오기
import routes from './routes'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
    // 스크롤 동작
    scrollBehavior(to, from, savedPosition) {
      // 기본적으로 맨 위로 스크롤
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        // 해시가 있으면 해당 앵커로 이동
        return { el: to.hash, behavior: 'smooth' }
      } else {
        return { left: 0, top: 0 }
      }
    },
  })

  return Router
})
