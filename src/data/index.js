import web from 'src/markdown/web-intro/web.md'
import httpHttps from 'src/markdown/web-intro/http-https.md'
import webBrowser from 'src/markdown/web-intro/web-browser.md'
import browserDevtools from 'src/markdown/web-intro/browser-devtools.md'
import cookieSession from 'src/markdown/web-intro/cookie-session.md'
import caching from 'src/markdown/web-intro/caching.md'
import dbms from 'src/markdown/web-intro/dbms.md'
import clientServerVuln from 'src/markdown/web-intro/client-server-side-vuln.md'

// 섹션 순서대로 title 과 src 를 매핑
export default [
  { title: '1. 웹', src: web },
  { title: '2. HTTP/HTTPS', src: httpHttps },
  { title: '3. Web Browser', src: webBrowser },
  { title: '4. Browser DevTools', src: browserDevtools },
  { title: '5. Cookie/Session', src: cookieSession },
  { title: '6. Caching', src: caching },
  { title: '7. DBMS', src: dbms },
  { title: '8. 클라이언트/서버SIDE 취약점', src: clientServerVuln },
]
