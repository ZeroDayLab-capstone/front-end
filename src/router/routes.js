const routes = [
  // ========== Main site ==========
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'main' } },

      // main/auth
      {
        path: 'main',
        name: 'main',
        component: () => import('pages/IndexPage.vue'),
        meta: { hasDrawer: false },
      },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'mypage', name: 'mypage', component: () => import('pages/MyPage.vue') },
      { path: 'findpwd', name: 'findpwd', component: () => import('pages/FindPasswordPage.vue') },

      // wargame (games)
      {
        path: 'gamecsrf',
        name: 'game-csrf',
        component: () => import('pages/wargame/GameCsrf.vue'),
      },
      {
        path: 'gamesqlinjection1',
        name: 'game-sqli-1',
        component: () => import('pages/wargame/GameSql1.vue'),
      },
      {
        path: 'gamesqlinjection2',
        name: 'game-sqli-2',
        component: () => import('pages/wargame/GameSql2.vue'),
      },
      {
        path: 'gamesqlinjection3',
        name: 'game-sqli-3',
        component: () => import('pages/wargame/GameSql3.vue'),
      },
      {
        path: 'gamecommandinjection',
        name: 'game-cmdi',
        component: () => import('pages/wargame/GameCmdInjection.vue'),
      },
      {
        path: 'gamexssstored1',
        name: 'game-xss-stored-1',
        component: () => import('pages/wargame/GameXssStored1.vue'),
      },
      {
        path: 'gamexssstored2',
        name: 'game-xss-stored-2',
        component: () => import('pages/wargame/GameXssStored2.vue'),
      },
      {
        path: 'gamexssstored3',
        name: 'game-xss-stored-3',
        component: () => import('pages/wargame/GameXssStored3.vue'),
      },
      {
        path: 'gamexssreflected',
        name: 'game-xss-reflected',
        component: () => import('pages/wargame/GameXssReflected.vue'),
      },
      {
        path: 'gamefilevuln2',
        name: 'game-path-traversal',
        component: () => import('pages/wargame/GamePathTraversal.vue'),
      },
      {
        path: 'gamefilevuln1',
        name: 'game-file-vuln',
        component: () => import('pages/wargame/GameFileVuln.vue'),
      },

      // wargame explanations
      {
        path: 'cmd-injection',
        name: 'wg-exp-cmdi',
        component: () => import('pages/wargame/explanation/CmdInjection.vue'),
      },
      {
        path: 'csrf-ex',
        name: 'wg-exp-csrf',
        component: () => import('pages/wargame/explanation/CsrfEx.vue'),
      },
      {
        path: 'file-vuln',
        name: 'wg-exp-filevuln',
        component: () => import('pages/wargame/explanation/FileVuln.vue'),
      },
      {
        path: 'sql-injection-1',
        name: 'wg-exp-sqli-1',
        component: () => import('pages/wargame/explanation/SqlInjection1.vue'),
      },
      {
        path: 'sql-injection-2',
        name: 'wg-exp-sqli-2',
        component: () => import('pages/wargame/explanation/SqlInjection2.vue'),
      },
      {
        path: 'sql-injection-3',
        name: 'wg-exp-sqli-3',
        component: () => import('pages/wargame/explanation/SqlInjection3.vue'),
      },
      {
        path: 'xss-reflected',
        name: 'wg-exp-xss-ref',
        component: () => import('pages/wargame/explanation/XssReflected.vue'),
      },
      {
        path: 'xss-stored-1',
        name: 'wg-exp-xss-st1',
        component: () => import('pages/wargame/explanation/XssStored1.vue'),
      },
      {
        path: 'xss-stored-2',
        name: 'wg-exp-xss-st2',
        component: () => import('pages/wargame/explanation/XssStored2.vue'),
      },
      {
        path: 'xss-stored-3',
        name: 'wg-exp-xss-st3',
        component: () => import('pages/wargame/explanation/XssStored3.vue'),
      },
      {
        path: 'path-traversal',
        name: 'wg-exp-path-trav',
        component: () => import('pages/wargame/explanation/PathTraversal.vue'),
      },

      {
        path: 'wargamelist',
        name: 'wargame-list',
        component: () => import('pages/WarGameListPage.vue'),
      },

      // web basic (8 sections)
      {
        path: 'webbasic',
        name: 'webbasic',
        component: () => import('pages/webBasic/WebBasicPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 웹 소개', to: { name: 'webbasic', query: { sec: 0 } } },
            { title: '2. HTTP/HTTPS', to: { name: 'webbasic', query: { sec: 1 } } },
            { title: '3. Web Browser', to: { name: 'webbasic', query: { sec: 2 } } },
            { title: '4. Browser DevTools', to: { name: 'webbasic', query: { sec: 3 } } },
            { title: '5. 쿠키/세션', to: { name: 'webbasic', query: { sec: 4 } } },
            { title: '6. 캐싱', to: { name: 'webbasic', query: { sec: 5 } } },
            { title: '7. DBMS', to: { name: 'webbasic', query: { sec: 6 } } },
            {
              title: '8. 클라이언트/서버 사이드 취약점',
              to: { name: 'webbasic', query: { sec: 7 } },
            },
          ],
          moduleKey: 'webbasic',
        },
      },

      // study
      { path: 'study', name: 'study', component: () => import('pages/StudyPage.vue') },

      // module pages with drawers
      {
        path: 'sqlinjection',
        name: 'sqlinjection',
        component: () => import('pages/sqlInjection/SqlInjectionLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 취약점 소개/작동 원리', to: { name: 'sqlinjection', query: { sec: 0 } } },
            { title: '2. 취약점이 발생하는 위치', to: { name: 'sqlinjection', query: { sec: 1 } } },
            { title: '3. 발생 이유', to: { name: 'sqlinjection', query: { sec: 2 } } }, // ← FIXED
            { title: '4. 실제 보안 사고 사례', to: { name: 'sqlinjection', query: { sec: 3 } } },
            { title: '5. 공격 기법', to: { name: 'sqlinjection', query: { sec: 4 } } },
            { title: '6. 방어 기법', to: { name: 'sqlinjection', query: { sec: 5 } } },
            { title: '7. MITRE ATT&CK 연관', to: { name: 'sqlinjection', query: { sec: 6 } } },
          ],
          moduleKey: 'sqlinjection',
        },
      },
      {
        path: 'commandinjection',
        name: 'commandinjection',
        component: () => import('pages/commandInjection/CommandInjectionLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            {
              title: '1. 취약점 소개/작동 원리',
              to: { name: 'commandinjection', query: { sec: 0 } },
            },
            {
              title: '2. 취약점이 발생하는 위치',
              to: { name: 'commandinjection', query: { sec: 1 } },
            },
            { title: '3. 발생 이유', to: { name: 'commandinjection', query: { sec: 2 } } },
            {
              title: '4. 실제 보안 사고 사례',
              to: { name: 'commandinjection', query: { sec: 3 } },
            },
            { title: '5. 공격 기법', to: { name: 'commandinjection', query: { sec: 4 } } },
            { title: '6. 방어 기법', to: { name: 'commandinjection', query: { sec: 5 } } },
            { title: '7. MITRE ATT&CK 연관', to: { name: 'commandinjection', query: { sec: 6 } } },
          ],
          moduleKey: 'commandinjection',
        },
      },
      {
        path: 'csrf',
        name: 'csrf',
        component: () => import('pages/csrf/CsrfLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 취약점 소개/작동 원리', to: { name: 'csrf', query: { sec: 0 } } },
            { title: '2. 취약점이 발생하는 위치', to: { name: 'csrf', query: { sec: 1 } } },
            { title: '3. 발생 이유', to: { name: 'csrf', query: { sec: 2 } } },
            { title: '4. 실제 보안 사고 사례', to: { name: 'csrf', query: { sec: 3 } } },
            { title: '5. 공격 기법', to: { name: 'csrf', query: { sec: 4 } } },
            { title: '6. 방어 기법', to: { name: 'csrf', query: { sec: 5 } } },
            { title: '7. MITRE ATT&CK 연관', to: { name: 'csrf', query: { sec: 6 } } },
          ],
          moduleKey: 'csrf',
        },
      },
      {
        path: 'xss',
        name: 'xss',
        component: () => import('pages/xss/XssLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 취약점 소개/작동 원리', to: { name: 'xss', query: { sec: 0 } } },
            { title: '2. 취약점이 발생하는 위치', to: { name: 'xss', query: { sec: 1 } } },
            { title: '3. 발생 이유', to: { name: 'xss', query: { sec: 2 } } },
            { title: '4. Stored vs Reflected', to: { name: 'xss', query: { sec: 3 } } },
            { title: '5. 실제 보안 사고 사례', to: { name: 'xss', query: { sec: 4 } } },
            { title: '6. MITRE ATT&CK 연관', to: { name: 'xss', query: { sec: 5 } } },
          ],
          moduleKey: 'xss',
        },
      },
      {
        path: 'filevuln',
        name: 'filevuln',
        component: () => import('pages/fileVulnerability/FileVulnLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 취약점 소개/작동 원리', to: { name: 'filevuln', query: { sec: 0 } } },
            { title: '2. File Upload Vulnerability', to: { name: 'filevuln', query: { sec: 1 } } },
            {
              title: '3. File Download Vulnerability',
              to: { name: 'filevuln', query: { sec: 2 } },
            },
            { title: '4. 실제 보안 사고 사례', to: { name: 'filevuln', query: { sec: 3 } } },
            { title: '5. MITRE ATT&CK 연관', to: { name: 'filevuln', query: { sec: 4 } } },
          ],
          moduleKey: 'filevuln',
        },
      },
      {
        path: 'ssrf',
        name: 'ssrf',
        component: () => import('pages/ssrf/SsrfLayoutPage.vue'),
        meta: {
          hasDrawer: true,
          drawerLinks: [
            { title: 'Back to Home', to: { name: 'main' } },
            { title: '1. 취약점 소개/작동 원리', to: { name: 'ssrf', query: { sec: 0 } } },
            { title: '2. 취약점이 발생하는 위치', to: { name: 'ssrf', query: { sec: 1 } } },
            {
              title: '3. 발생 이유',
              to: { name: 'ssrf', query: { sec: 2 } },
            },
            { title: '4. 실제 보안 사고 사례', to: { name: 'ssrf', query: { sec: 3 } } },
            { title: '5. MITRE ATT&CK 연관', to: { name: 'ssrf', query: { sec: 4 } } },
          ],
          moduleKey: 'ssrf',
        },
      },

      {
        path: 'community',
        name: 'community',
        component: () => import('pages/CommunityPage.vue'),
        children: [
          { path: '', redirect: { name: 'community-faq' } }, // 기본 진입시 faq로
          {
            path: 'notice',
            name: 'community-notice',
            component: () => import('pages/community/NoticeList.vue'),
          },
          {
            path: 'faq',
            name: 'community-faq',
            component: () => import('pages/community/FaqList.vue'),
          },
          {
            path: 'qna',
            name: 'community-qna',
            component: () => import('pages/community/QnaList.vue'),
          },
          {
            path: 'notice/:id',
            name: 'community-notice-detail',
            component: () => import('pages/community/NoticeDetail.vue'),
          },
          {
            path: 'qna/:id',
            name: 'community-qna-detail',
            component: () => import('pages/community/QnaDetail.vue'),
          },
        ],
      },

      // md test (children 안에 둘 거면 절대경로 금지)
      { path: 'mdtest', name: 'mdtest', component: () => import('pages/TestMarkdownPage.vue') },
    ],
  },

  // ========== Admin ==========
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: { name: 'admin-users' } },
      { path: 'users', name: 'admin-users', component: () => import('pages/admin/AllUsers.vue') },
      { path: 'labs', name: 'admin-labs', component: () => import('pages/admin/AddLabs.vue') },
      {
        path: 'server-status',
        name: 'admin-server',
        component: () => import('pages/admin/ServerStatus.vue'),
      },
      {
        path: 'user-results',
        name: 'admin-user-results',
        component: () => import('pages/admin/UserResults.vue'),
      },
      { path: 'logs', name: 'admin-logs', component: () => import('pages/admin/SysLogs.vue') },
    ],
  },

  // ========== 404 ==========
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },
]

export default routes
