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
        component: () => import('src/pages/sqlInjection/SQLinjectionLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 취약점 소개/작동 원리', path: '/sqlinjection?sec=0' },
            { title: '2. 취약점이 발생하는 위치', path: '/sqlinjection?sec=1' },
            { title: '3. 발생 이유', path: '/csrf?sec=2' },
            { title: '4. 실제 보안 사고 사례', path: '/sqlinjection?sec=3' },
            { title: '5. 공격 기법', path: '/sqlinjection?sec=4' },
            { title: '6. 방어 기법', path: '/sqlinjection?sec=5' },
            { title: '7. MITRE ATT&CK 프레임워크 연관', path: '/sqlinjection?sec=6' },
          ],
        },
      },
      {
        path: 'commandinjection',
        component: () => import('src/pages/commandInjection/CommandInjectionLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 취약점 소개/작동 원리', path: '/commandinjection?sec=0' },
            { title: '2. 취약점이 발생하는 위치', path: '/commandinjection?sec=1' },
            { title: '3. 발생 이유', path: '/commandinjection?sec=2' },
            { title: '4. 실제 보안 사고 사례', path: '/commandinjection?sec=3' },
            { title: '5. 공격 기법', path: '/commandinjection?sec=4' },
            { title: '6. 방어 기법', path: '/commandinjection?sec=5' },
            { title: '7. MITRE ATT&CK 프레임워크 연관', path: '/commandinjection?sec=6' },
          ],
        },
      },
      {
        path: 'xss',
        component: () => import('src/pages/xss/XssLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 취약점 소개/작동 원리', path: '/xss?sec=0' },
            { title: '2. 취약점이 발생하는 위치', path: '/xss?sec=1' },
            { title: '3. 발생 이유', path: '/xss?sec=2' },
            { title: '4. Stored XSS와 Reflected XSS', path: '/xss?sec=3' },
            { title: '5. MITRE ATT&CK 프레임워크 연관', path: '/xss?sec=4' },
          ],
        },
      },
      {
        path: 'filevuln',
        component: () => import('src/pages/fileVulnerability/FileVulnLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 취약점 소개/작동 원리', path: '/filevuln?sec=0' },
            { title: '2. File Upload Vulnerability', path: '/filevuln?sec=1' },
            { title: '3. File Download Vulnerability', path: '/filevuln?sec=2' },
            { title: '4. 실제 보안 사고 사례', path: '/filevuln?sec=3' },
          ],
        },
      },
      {
        path: 'csrf',
        component: () => import('src/pages/csrf/CsrfLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', path: '/main' },
            { title: '1. 취약점 소개/작동 원리', path: '/csrf?sec=0' },
            { title: '2. 취약점이 발생하는 위치', path: '/csrf?sec=1' },
            { title: '3. 발생 이유', path: '/csrf?sec=2' },
            { title: '4. 실제 보안 사고 사례', path: '/csrf?sec=3' },
            { title: '5. 공격 기법', path: '/csrf?sec=4' },
            { title: '6. 방어 기법', path: '/csrf?sec=5' },
            { title: '7. MITRE ATT&CK 프레임워크 연관', path: '/csrf?sec=6' },
          ],
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
