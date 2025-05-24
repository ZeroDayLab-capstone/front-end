<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      <div>앞서 우리는 다양한 형태의 XSS에 대해 확인했습니다.</div>
      <div class="q-py-sm">
        이중에서 우리는 자주 사용되는 Stored XSS와 Reflected XSS에 대해서 알아볼 예정입니다.
      </div>
      <div class="q-pa-md">
        <div style="display: list-item; list-style-type: disc">
          <span class="text-weight-bold">Stored XSS</span> - 서버의 데이터베이스 또는 파일 등의
          형태로 저장된 악성 스크립트를 조회할 떄 발생하는 XSS입니다. 대표적으로 게시물과 댓글에
          악성 스크립트를 포합해 업로드하는 방식이 있습니다. 게시물은 불특정 다수에게 보여지기
          때문에 해당 기능에서 XSS 취약점이 존재할 경우 높은 파급력을 가질 수 있습니다.
        </div>
      </div>
      <div class="q-pa-md">
        <div style="display: list-item; list-style-type: disc">
          <span class="text-weight-bold">Reflected XSS</span> - 서버가 악성 스크립트가 담긴 요청을
          출력할 때 발생합니다. 대표적으로 게시판 서비스에서 작성된 게시물을 조회하기 위한
          검색창에서 스크립트를 포함해 검색하는 방식이 있습니다. 이용자가 게시물을 검색하면
          서버에서는 검색 결과를 이용자에게 반환합니다. 일부 서비스에서는 검색 결과를 응답에
          포함하는데, 검색 문자열에 악성 스크립트가 포함되어 있다면 Reflected XSS가 발생할 수
          있습니다.
        </div>
      </div>
      <div>그렇다면 Stored XSS와 Reflected XSS의 **차이점**은 무엇일까요?</div>
      <div class="q-pa-md">
        <div style="display: list-item; list-style-type: disc">
          Reflected XSS는 Stored XSS와는 다르게 URL과 같은 이용자의 요청에 의해 발생합니다. 따라서
          공격을 위해서는 다른 이용자를 악성 스크립트가 포함된 링크에 접속하도록 유도해야 합니다.
          이용자에게 링크를 직접 전달하는 방법은 악성 스크립트 포함 여부를 이용자가 눈치챌 수 있기
          때문에 주로 Click Jacking 또는 Open Redirect 등 다른 취약점과 연계하여 사용합니다.
        </div>
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-pt-xl">✅Stored XSS</div>
    <div class="text-h6 text-weight-bold q-pt-lg">작동 구조</div>
    <div class="text-h6">
      <div>1. 공격자가 게시판, 댓글 등 입력 가능한 폼에 악성 스크립트 삽입</div>
      <div>2. 이 입력값이 서버에 저장됨(DB, 파일 등)</div>
      <div>3. 피해 사용자가 해당 페이지를 열면 스크립트가 브라우저에서 자동 실행</div>
      <div>4. 쿠키 탈취, 세션 하이재킹, 악성 리디렉션 등이 발생</div>
      <div>➡️다른 사용자가 열었을 때 자동 실행되므로 피해 범위가 커질 수 있음.</div>
    </div>

    <div class="text-h6 q-pt-lg">⚔공격 기법</div>
    <div class="notion-like text-h6">
      <!-- 1. 게시판/댓글에 스크립트 삽입 -->
      <div class="section">
        <div>1. 게시판/댓글에 스크립트 삽입</div>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
        </q-card>
      </div>

      <!-- 2. 이벤트 기반 태그 삽입 -->
      <div class="section">
        <div>2. 이벤트 기반 태그 삽입</div>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;img src="x" onerror="alert('XSS')"&gt;</code></pre>
        </q-card>
      </div>

      <!-- 3. 프로필 정보나 상품 설명에 삽입 -->
      <div class="section">
        <div>3. 프로필 정보나 상품 설명에 삽입</div>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;svg onload=alert('XSS')&gt;</code></pre>
        </q-card>
      </div>
    </div>

    <div class="text-h6 q-pt-lg">⚒방어 기법</div>
    <div class="text-h6">
      <div>1. 출력 시 HTML 이스케이프</div>
      <div class="notion-like">
        <!-- 1. 출력 시 HTML 이스케이프 -->
        <div class="section">
          <q-card flat bordered class="code-block">
            <pre><code>import html
safe_output = html.escape(user_input)</code></pre>
          </q-card>
        </div>
      </div>
      <div>2. 정확한 출력 위치별 이스케이프</div>
      <div class="q-pl-lg">
        <div style="display: list-item; list-style-type: disc">
          HTML 본문 → <span style="color: red">html.escape()</span>
        </div>
        <div style="display: list-item; list-style-type: disc">
          속성값 → 땀옴표 감싸기 + 이스케이프
        </div>
        <div style="display: list-item; list-style-type: disc">
          Javascript 내 → <span style="color: red">JSON.stringify()</span> 사용
        </div>
      </div>
      <div class="q-pt-md">3. CSP(Content Security Policy) 적용</div>
      <div class="section">
        <q-card flat bordered class="code-block">
          <pre><code>Content-Security-Policy: script-src 'self'</code></pre>
        </q-card>
      </div>

      <div>4. 보안 프레임워크/라이브러리 사용</div>
      <div class="q-pl-lg">
        <div style="display: list-item; list-style-type: disc">
          React, Vue등의 프레임워크는 자동 이스케이프 처리
        </div>
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-pt-xl">✅Reflected XSS</div>
    <div class="text-h6 text-weight-bold q-pt-lg">작동 구조</div>
    <div class="text-h6">
      <div>
        1. 공격자가 {{ codeSnippet }} 같은 <span class="text-weight-bold">악성 URL을 조작</span>
      </div>
      <div>
        2. 피해자가 이 링크를 클릭 → 서버는 입력값을
        <span class="text-weight-bold">검증 없이 페이지에 반영</span>
      </div>
      <div>3. 응답 페이지에서 <span class="text-weight-bold">브라우저가 스크립트를 실행</span></div>
      <div>➡️공격자는 보통 이메일, DM SNS 등으로 링크를 유도함</div>
    </div>

    <div class="text-h6 q-pt-xl">⚔공격 기법</div>
    <div class="notion-like text-h6">
      <!-- 1. 쿼리스트링에 스크립트 삽입 -->
      <div class="section">
        <div>1. 쿼리스트링에 스크립트 삽입</div>
        <q-card flat bordered class="code-block">
          <pre><code>http://example.com/search?q=&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
        </q-card>
      </div>

      <!-- 2. URL 조작 후 자동 실행 -->
      <div class="section">
        <div>2. URL 조작 후 자동 실행</div>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;a href="http://example.com/welcome?name=&lt;img src=x onerror=alert('XSS')"&gt;Click&lt;/a&gt;</code></pre>
        </q-card>
      </div>

      <!-- 3. DOM-based Reflected XSS -->
      <div class="section">
        <div>3. DOM-based Reflected XSS</div>
        <q-card flat bordered class="code-block">
          <pre><code>// URL: http://example.com/#&lt;script&gt;alert(1)&lt;/script&gt;
// 취약 코드: document.write(location.hash);</code></pre>
        </q-card>
      </div>
    </div>

    <div class="text-h6 q-pt-lg">⚒방어 기법</div>
    <div class="text-h6">
      <div class="text-weight-bold q-pt-sm">1. 출력 위치에 따른 이스케이프 처리</div>
      <div class="q-pl-md">
        <div style="display: list-item; list-style-type: disc">
          HTML 본문: <span style="color: red">html.escape()</span>
        </div>
        <div style="display: list-item; list-style-type: disc">
          속성: <span style="color: red">"..."</span>으로 감싸고 escape
        </div>
        <div style="display: list-item; list-style-type: disc">
          JS 내: <span style="color: red">JSON.stringify(), textContent</span> 사용
        </div>
      </div>
      <div class="text-weight-bold q-pt-md">2. 입력값 검증(화이트리스트 기반)</div>
    </div>
    <div class="notion-like">
      <!-- 2. 입력값 검증 (화이트리스트 기반) -->
      <div class="section">
        <q-card flat bordered class="code-block">
          <pre><code>import re
if re.search(r"[{{ codeSnippet2 }}\"]", user_input):
    return "Invalid input"</code></pre>
        </q-card>
      </div>
    </div>

    <div class="text-weight-bold text-h6">3. CSP 정책 적용</div>
    <!-- 3. CSP 정책 적용 -->
    <div class="section">
      <q-card flat bordered class="code-block">
        <pre><code>Content-Security-Policy: default-src 'self'; script-src 'self'</code></pre>
      </q-card>
    </div>

    <div class="text-h6">
      <div class="text-weight-bold">4. URL 인코딩 처리</div>
      <div class="q-pl-md">
        <div style="display: list-item; list-style-type: disc">
          URL 파라미터 값은 반드시 <span style="color: red">urllib.parse.quote()</span> 등으로
          인코딩
        </div>
        <div style="display: list-item; list-style-type: disc">
          <span style="color: red">{{ codeSnippet3 }}</span> →
          <span style="color: red">%3Cscript%3E</span> 로 변환되면 실행되지 않음
        </div>
      </div>
      <div class="text-weight-bold q-pt-md">5. Referrer 체크, 해시 처리</div>
      <div class="q-pl-md">
        <div style="display: list-item; list-style-type: disc">
          해이 영역(<span style="color: red">#fragment</span>)는 서버에 전달되지 않도록 설게 가능
        </div>
      </div>
    </div>
    <div class="row justify-center q-my-xl">
      <q-img :src="xss5" style="width: 750px"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import xss5 from 'src/assets/xss5.png'

const codeSnippet = '?input=<script>'
const codeSnippet2 = '<>'
const codeSnippet3 = '<script>'
</script>

<style scoped>
.notion-like {
  max-width: 800px;
  margin: auto;
}
.section {
  margin-bottom: 24px;
}
.title {
  margin-bottom: 12px;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f1f1f;
}
.code-block {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}
.code-block pre {
  margin: 0;
  padding: 12px 16px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: pre-wrap;
}
.notes {
  margin-top: 8px;
  padding-left: 16px;
}
.notes li {
  margin-bottom: 4px;
  color: #333;
  font-size: 0.95rem;
}
.keyword {
  color: #e90;
  font-weight: 600;
}
</style>
