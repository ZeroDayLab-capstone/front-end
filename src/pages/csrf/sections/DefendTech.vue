<template>
  <q-page class="q-pa-md">
    <div class="notion-like">
      <!-- 1번 섹션 -->
      <div class="section">
        <h3 class="title">1. CSRF 토큰 사용 (가장 효과적인 방법!)</h3>
        <ul class="notes">
          <li>
            요청마다 랜덤한 <span class="keyword">CSRF 토큰</span>을 생성하여 사용자가 요청할 때
            함께 전송하도록 함
          </li>
          <li>서버는 받은 토큰이 유효한지 검증하여 공격을 차단</li>
        </ul>

        <h4 class="subtitle"># Flask 예제</h4>
        <q-card flat bordered class="code-block">
          <pre><code>from flask import request, session, abort

@app.route("/transfer", methods=["POST"])
def transfer():
    if request.form.get("csrf_token") != session.get("csrf_token"):
        abort(403)  # 잘못된 요청 차단</code></pre>
        </q-card>
        <ul class="notes">
          <li>공격자는 CSRF 토큰을 예측할 수 없으므로 공격이 어려움</li>
        </ul>
      </div>

      <!-- 2번 섹션 -->
      <div class="section">
        <h3 class="title">2. SameSite 쿠키 설정</h3>
        <ul class="notes">
          <li>
            <span class="keyword">SameSite</span> 속성을 사용하여 외부 도메인에서 요청이 발생할 경우
            쿠키를 보내지 않도록 설정할 수 있음
          </li>
        </ul>

        <q-card flat bordered class="code-block">
          <pre><code>Set-Cookie: sessionid=abcd1234; HttpOnly; Secure; SameSite=Strict</code></pre>
        </q-card>
        <ul class="notes">
          <li><span class="keyword">Strict</span> : 크로스 사이트 요청에서는 쿠키 전송 금지</li>
          <li><span class="keyword">Lax</span> : GET 요청만 허용 (로그인 유지 가능)</li>
        </ul>
      </div>

      <!-- 3번 섹션 -->
      <div class="section">
        <h3 class="title">3. Referer 검증</h3>
        <ul class="notes">
          <li>
            요청의 <span class="keyword">Referer</span> 헤더를 확인하여 신뢰할 수 없는 출처에서 온
            요청 차단할 수 있음
          </li>
        </ul>
        <q-card flat bordered class="code-block">
          <pre><code>from flask import request, abort

@app.route("/transfer", methods=["POST"])
def transfer():
    if "bank.example.com" not in request.headers.get("Referer", ""):
        abort(403)  # 차단</code></pre>
        </q-card>
        <ul class="notes">
          <li>단, 일부 브라우저는 <span class="keyword">Referer</span> 정보를 차단할 수도 있음</li>
        </ul>
      </div>

      <!-- 4번 섹션 -->
      <div class="section">
        <h3 class="title">4. 중요한 요청에 비밀번호 재확인 요구</h3>
        <ul class="notes">
          <li>송금, 비밀번호 변경 같은 중요한 요청 시 비밀번호를 다시 입력하도록 함</li>
        </ul>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;form action="/transfer" method="POST"&gt;
  &lt;label&gt;비밀번호 확인:&lt;/label&gt;
  &lt;input type="password" name="password"&gt;
&lt;/form&gt;</code></pre>
        </q-card>
        <ul class="notes">
          <li>공격자는 사용자의 비밀번호를 모르므로 CSRF 공격이 어려움</li>
        </ul>
      </div>

      <!-- 5번 섹션 -->
      <div class="section">
        <h3 class="title">5. CORS 정책 활용</h3>
        <ul class="notes">
          <li>서버가 특정 출처(origin)에서 온 요청만 허용하도록 설정할 수 있음</li>
        </ul>
        <q-card flat bordered class="code-block">
          <pre><code>Access-Control-Allow-Origin: https://trusted.example.com</code></pre>
        </q-card>
        <ul class="notes">
          <li>
            <span class="keyword">Access-Control-Allow-Origin</span> 헤더를 사용하여 신뢰할 수 있는
            도메인만 허용하는 것이 좋음
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// 필요하다면 추가 스크립트 로직을 여기에
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
.subtitle {
  margin: 16px 0 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #555;
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
