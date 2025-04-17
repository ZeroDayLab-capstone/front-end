const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 1) 메인 페이지 (fallback menu)
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        // meta: {}
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        // meta: {}
      },
      {
        path: 'main',
        component: () => import('pages/IndexPage.vue'),
        // meta: {}
      },

      // 2) MyPage (fallback menu)
      {
        path: 'mypage',
        component: () => import('pages/MyPage.vue'),
      },

      // 3) Web Basic (예시로 drawerLinks 지정)
      {
        path: 'webbasic',
        component: () => import('pages/WebBasicPage.vue'),
        meta: {
          drawerLinks: [
            { title: '웹 소개', path: '/webbasic?intro=1' },
            { title: 'HTTP/HTTPS', path: '/webbasic?http=1' },
            { title: 'Web Browser', path: '/webbasic?http=1' },
            { title: 'Browser DevTools', path: '/webbasic?http=1' },
            { title: '쿠키/세션', path: '/webbasic?http=1' },
            { title: '캐싱', path: '/webbasic?http=1' },
            { title: 'DBMS', path: '/webbasic?http=1' },
            { title: '클라인어트 사이드 취약점/서버 사이드 취약점', path: '/webbasic?http=1' },
          ],
        },
      },

      // 4) Study 라우트 (하위 공격 기법들을 Drawer로 연결)
      {
        path: 'study',
        component: () => import('pages/StudyPage.vue'),
        //meta: {}
      },

      // 5) 각 공격 기법 페이지
      {
        path: 'sqlinjection',
        component: () => import('pages/SQLinjectionPage.vue'),
        meta: {
          drawerLinks: [
            // 이 라우트만의 Drawer 항목 (예시)
            { title: 'Back to Study', path: '/study' },
          ],
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
        component: () => import('pages/IdorPage.vue'),
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

  // 404 등 예외 라우트
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
