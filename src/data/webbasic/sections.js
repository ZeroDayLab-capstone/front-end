import { defineAsyncComponent } from 'vue'

export const webbasicSections = [
  {
    title: '1️⃣ 웹',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/WebIntro.vue')),
    quizzes: [
      {
        question:
          '웹의 4가지 기본 구성 요소 중, 웹에 갖춰진 정보 자산이며 고유의 URI를 가지는 것을 무엇이라고 할까요?',
        options: [
          { label: '웹 서버', value: 'a' },
          { label: '웹 브라우저', value: 'b' },
          { label: '하이퍼링크', value: 'c' },
          { label: '웹 리소스', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question:
          '사용자가 웹 브라우저에 URL을 입력했을 때, DNS 조회 다음으로 수행되는 과정은 무엇인가요?',
        options: [
          { label: '렌더링 엔진 초기화', value: 'a' },
          { label: '캐시 프리로드', value: 'b' },
          { label: '서버 요청', value: 'c' },
          { label: '이미지 디코딩', value: 'd' },
        ],
        answer: 'c',
      },
    ],
  },
  {
    title: '2️⃣ HTTP/HTTPS',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/HttpHttps.vue')),
    quizzes: [
      {
        question:
          'HTTP 응답 상태 코드 중, 클라이언트 요청은 유효하지만 서버 에러로 실패했음을 나타내는 범위는?',
        options: [
          { label: '1xx (정보)', value: 'a' },
          { label: '3xx (리다이렉션)', value: 'b' },
          { label: '4xx (클라이언트 오류)', value: 'c' },
          { label: '5xx (서버 오류)', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: 'GET과 POST 중, 데이터를 URL 쿼리스트링으로 전송하여 보안에 취약한 방식은?',
        options: [
          { label: 'POST', value: 'a' },
          { label: 'PUT', value: 'b' },
          { label: 'GET', value: 'c' },
          { label: 'PATCH', value: 'd' },
        ],
        answer: 'c',
      },
    ],
  },
  {
    title: '3️⃣ Web Browser',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/WebBrowser.vue')),
    quizzes: [
      {
        question: 'URL 요소 중, 서버와 어떤 프로토콜로 통신할지 나타내는 부분은?',
        options: [
          { label: 'Host', value: 'a' },
          { label: 'Path', value: 'b' },
          { label: 'Query String', value: 'c' },
          { label: 'Scheme', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: '`https://example.com:8080/...` 에서 포트 번호는?',
        options: [
          { label: '443', value: 'a' },
          { label: '8080', value: 'b' },
          { label: '/path/to/resource', value: 'c' },
          { label: '#fragment', value: 'd' },
        ],
        answer: 'b',
      },
    ],
  },
  {
    title: '4️⃣ Browser DevTools',
    component: defineAsyncComponent(
      () => import('src/pages/webBasic/sections/BrowserDevtools.vue'),
    ),
    quizzes: [
      {
        question: '개발자 도구에서 HTML을 검사하는 패널은?',
        options: [
          { label: 'Console', value: 'a' },
          { label: 'Network', value: 'b' },
          { label: 'Sources', value: 'c' },
          { label: 'Elements', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: '쿠키 포함 앱 관련 저장소를 확인할 수 있는 패널은?',
        options: [
          { label: 'Security', value: 'a' },
          { label: 'Performance', value: 'b' },
          { label: 'Lighthouse', value: 'c' },
          { label: 'Application', value: 'd' },
        ],
        answer: 'd',
      },
    ],
  },
  {
    title: '5️⃣ Cookie/Session',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/CookieSession.vue')),
    quizzes: [
      {
        question: '서버에 인증 정보를 저장하고 키를 클라이언트에 전달해 접근시키는 방식은?',
        options: [
          { label: 'JWT', value: 'a' },
          { label: '쿠키 기반 인증', value: 'b' },
          { label: '캐시 키', value: 'c' },
          { label: '세션', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: '다른 출처의 데이터를 읽지 못하게 하는 브라우저 보안 메커니즘은?',
        options: [
          { label: 'CORS', value: 'a' },
          { label: 'CSP', value: 'b' },
          { label: 'HSTS', value: 'c' },
          { label: 'SOP (동일 출처 정책)', value: 'd' },
        ],
        answer: 'd',
      },
    ],
  },
  {
    title: '6️⃣ Caching',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/BasicCaching.vue')),
    quizzes: [
      {
        question: '브라우저가 정적 리소스를 저장해 로딩 속도를 높이는 캐싱은?',
        options: [
          { label: '프록시 캐시', value: 'a' },
          { label: 'CDN 캐시', value: 'b' },
          { label: '서버 캐시', value: 'c' },
          { label: '브라우저 캐시', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: '캐싱의 주요 목적 중 서버에 동일 데이터 재요청을 줄여 부담을 낮추는 목적은?',
        options: [
          { label: '응답 속도 향상', value: 'a' },
          { label: '서버 부하 감소', value: 'b' },
          { label: '대역폭 증가', value: 'c' },
          { label: '데이터 무결성 강화', value: 'd' },
        ],
        answer: 'b',
      },
    ],
  },
  {
    title: '7️⃣ DBMS',
    component: defineAsyncComponent(() => import('src/pages/webBasic/sections/BasicDbms.vue')),
    quizzes: [
      {
        question: '행/열 테이블 기반으로 SQL을 사용하는 DBMS는?',
        options: [
          { label: 'NoSQL', value: 'a' },
          { label: 'Key-Value Store', value: 'b' },
          { label: 'Graph DBMS', value: 'c' },
          { label: 'RDBMS', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: 'SQL에서 S가 의미하는 것은?',
        options: [
          { label: 'Sequential', value: 'a' },
          { label: 'Secure', value: 'b' },
          { label: 'Standard', value: 'c' },
          { label: 'Structured (구조화된)', value: 'd' },
        ],
        answer: 'd',
      },
    ],
  },
  {
    title: '8️⃣ 클라이언트/서버 취약점',
    component: defineAsyncComponent(
      () => import('src/pages/webBasic/sections/ClientServerVuln.vue'),
    ),
    quizzes: [
      {
        question: 'SQLi, Command Injection, SSRF 등 서버/DB를 노리는 취약점 유형은?',
        options: [
          { label: '클라이언트 사이드 취약점', value: 'a' },
          { label: '네트워크 계층 취약점', value: 'b' },
          { label: '소셜 엔지니어링', value: 'c' },
          { label: '서버 사이드 취약점', value: 'd' },
        ],
        answer: 'd',
      },
      {
        question: '브라우저를 공격 대상으로 JS 삽입/HTML 변조 등을 사용하는 취약점 유형은?',
        options: [
          { label: '서버 사이드 취약점', value: 'a' },
          { label: '네트워크 취약점', value: 'b' },
          { label: '인증 실패', value: 'c' },
          { label: '클라이언트 사이드 취약점', value: 'd' },
        ],
        answer: 'd',
      },
    ],
  },
]
