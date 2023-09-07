import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    // 首页
    {
      redirect: '/article/manage',
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          path: '/article/manage',
          name: 'articleManage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          name: 'articleChannel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          name: 'userProfile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          name: 'userAvatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          name: 'userPassword',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// login access interceptor
router.beforeEach((to) => {
  //Intercept login, if no token and accessing a non-login page
  // Otherwise, allow normal access.
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
