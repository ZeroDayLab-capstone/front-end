const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 루트 접속 시 /main 으로 리디렉트
      { path: '', redirect: '/main' },
      // 메인 페이지
      {
        path: 'main',
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
        path: 'mypage',
        component: () => import('pages/MyPage.vue'),
      },

      // wargame
      {
        path: 'gamecsrf',
        component: () => import('src/pages/wargame/GameCsrf.vue'),
      },
      {
        path: 'gamesqlinjection1',
        component: () => import('src/pages/wargame/GameSql1.vue'),
      },

      {
        path: 'gamesqlinjection2',
        component: () => import('src/pages/wargame/GameSql2.vue'),
      },

      {
        path: 'gamesqlinjection3',
        component: () => import('src/pages/wargame/GameSql3.vue'),
      },

      {
        path: 'gamecommandinjection',
        component: () => import('src/pages/wargame/GameCmdInjection.vue'),
      },

      {
        path: 'gamexssstored1',
        component: () => import('src/pages/wargame/GameXssStored1.vue'),
      },

      {
        path: 'gamexssstored2',
        component: () => import('src/pages/wargame/GameXssStored2.vue'),
      },

      {
        path: 'gamexssstored3',
        component: () => import('src/pages/wargame/GameXssStored3.vue'),
      },

      {
        path: 'gamexssreflected',
        component: () => import('src/pages/wargame/GameXssReflected.vue'),
      },
      {
        path: 'gamefilevuln2',
        component: () => import('src/pages/wargame/GamePahtTraversal.vue'),
      },

      {
        path: 'gamefilevuln1',
        component: () => import('src/pages/wargame/GameFileVuln.vue'),
      },

      //wargame explanation
      {
        path: 'cmd-injection',
        name: 'WargameExplanationCmdInjection',
        component: () => import('pages/wargame/explanation/CmdInjection.vue'),
      },
      {
        path: 'csrf-ex',
        name: 'WargameExplanationCsrfEx',
        component: () => import('pages/wargame/explanation/CsrfEx.vue'),
      },
      {
        path: 'file-vuln',
        name: 'WargameExplanationFileVuln',
        component: () => import('pages/wargame/explanation/FileVuln.vue'),
      },
      {
        path: 'sql-injection-1',
        name: 'WargameExplanationSqlInjection1',
        component: () => import('pages/wargame/explanation/SqlInjection1.vue'),
      },
      {
        path: 'sql-injection-2',
        name: 'WargameExplanationSqlInjection2',
        component: () => import('pages/wargame/explanation/SqlInjection2.vue'),
      },
      {
        path: 'sql-injection-3',
        name: 'WargameExplanationSqlInjection3',
        component: () => import('pages/wargame/explanation/SqlInjection3.vue'),
      },
      {
        path: 'xss-reflected',
        name: 'WargameExplanationXssReflected',
        component: () => import('pages/wargame/explanation/XssRdflected.vue'),
      },
      {
        path: 'xss-stored-1',
        name: 'WargameExplanationXssStored1',
        component: () => import('pages/wargame/explanation/XssStored1.vue'),
      },
      {
        path: 'xss-stored-2',
        name: 'WargameExplanationXssStored2',
        component: () => import('pages/wargame/explanation/XssStored2.vue'),
      },
      {
        path: 'xss-stored-3',
        name: 'WargameExplanationXssStored3',
        component: () => import('pages/wargame/explanation/XssStored3.vue'),
      },
      {
        path: 'path-traversal',
        name: 'WargameExplanationPathTraserval',
        component: () => import('pages/wargame/explanation/PathTraversal.vue'),
      },

      //
      {
        path: 'wargamelist',
        component: () => import('pages/WarGameListPage.vue'),
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
        component: () => import('src/pages/sqlInjection/SqlInjectionLayoutPage.vue'),
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
            { title: '5. 실제 보안 사고 사례', path: '/xss?sec=4' },
            { title: '6. MITRE ATT&CK 프레임워크 연관', path: '/xss?sec=5' },
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
            { title: '5. MITRE ATT&CK 프레임워크 연관', path: '/filevuln?sec=4' },
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

      {
        path: '/admin',
        component: () => import('layouts/AdminLayout.vue'),
        children: [
          { path: 'users', component: () => import('pages/admin/AllUsers.vue') },
          { path: 'labs', component: () => import('pages/admin/AddLabs.vue') },
          { path: 'server-status', component: () => import('pages/admin/ServerStatus.vue') },
          { path: 'user-results', component: () => import('pages/admin/UserResults.vue') },
          { path: 'logs', component: () => import('pages/admin/SysLogs.vue') },
          // 기본 /admin 로 접근 시 리다이렉트하려면 아래 한 줄 추가
          { path: '', redirect: '/admin/users' },
        ],
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
