const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'main', component: () => import('pages/IndexPage.vue') },
      { path: 'mypage', component: () => import('pages/MyPage.vue') },
      { path: 'study', component: () => import('pages/StudyPage.vue') },
      { path: 'sqlinjection', component: () => import('pages/SQLinjectionPage.vue') },
      { path: 'xss', component: () => import('pages/XssPage.vue') },
      { path: 'idor', component: () => import('pages/IdorPage.vue') },
      { path: 'csrf', component: () => import('pages/CsrfPage.vue') },
      { path: 'webbasic', component: () => import('pages/WebBasicPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
