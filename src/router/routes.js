const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { hasDrawer: false },
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: 'main',
        component: () => import('pages/IndexPage.vue'),
      },

      {
        path: 'mypage',
        component: () => import('pages/MyPage.vue'),
      },

      {
        path: 'problemexplanation',
        component: () => import('pages/ProblemExplanationPage.vue'),
      },

      {
        path: 'wargameexplanation',
        component: () => import('pages/WarGameExplanationPage.vue'),
      },

      {
        // 웹 기초 페이지 (8개 섹션)
        path: 'webbasic',
        component: () => import('src/pages/webBasic/WebBasicPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 웹 소개', path: '/webbasic?sec=0' },
            { title: '2. HTTP/HTTPS', path: '/webbasic?sec=1' },
            { title: '3. Web Browser', path: '/webbasic?sec=2' },
            { title: '4. Browser DevTools', path: '/webbasic?sec=3' },
            { title: '5. 쿠키/세션', path: '/webbasic?sec=4' },
            { title: '6. 캐싱', path: '/webbasic?sec=5' },
            { title: '7. DBMS', path: '/webbasic?sec=6' },
            { title: '8. 클라이언트/서버 사이드 취약점', path: '/webbasic?sec=7' },
          ],
        },
      },

      {
        path: 'study',
        component: () => import('pages/StudyPage.vue'),
      },

      // 취약점 페이지들 (예시)
      {
        path: 'sqlinjection',
        component: () => import('pages/SQLinjectionPage.vue'),
        meta: {
          drawerLinks: [{ title: 'Back to Study', path: '/study' }],
        },
      },
      {
        path: 'xss',
        component: () => import('pages/XssPage.vue'),
        meta: {
          drawerLinks: [{ title: 'Back to Study', path: '/study' }],
        },
      },
      {
        path: 'idor',
        component: () => import('src/pages/FileVulnerabilityPage.vue'),
        meta: {
          drawerLinks: [{ title: 'Back to Study', path: '/study' }],
        },
      },
      {
        path: 'csrf',
        component: () => import('pages/CsrfPage.vue'),
        meta: {
          drawerLinks: [{ title: 'Back to Study', path: '/study' }],
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
