<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="col-12 col-md-10 col-lg-8">
      <q-card flat bordered class="bg-white text-dark shadow-1">
        <!-- 해설 헤더 -->
        <q-card-section>
          <div class="text-h5 text-weight-bold">📖해설</div>
        </q-card-section>

        <!-- 1) 수동 마크업된 해설 -->
        <div class="text-h6 q-pl-md">
          <strong>1. 세션·토큰 발급</strong> (
          <span style="color: red">/api/login</span>
          )
          <ul class="q-mt-none">
            <li>
              로그인 성공 시 <span style="color: red">session_id</span> (HttpOnly)와
              <span style="color: red">csrf_token</span> (JS에서 읽을 수 있는 쿠키)를 발급합니다.
            </li>
          </ul>
          <strong>2. 취약점 핵심</strong> ( <span style="color: red">/api/change_role</span> )
          <ul class="q-mt-none">
            <li>CSRF 토큰이 없는 요청은 검증 블록을 <strong>스킵</strong>하도록 구현되어 있어,</li>
            <li>
              토큰 필드 자체가 존재하지 않으면
              <span style="color: red"> if token: </span>
              분기로 진입하지 않고 관리자 권한을 부여합니다.
            </li>
          </ul>
          <strong>3. 공격 코드</strong>
          <q-card flat bordered class="code-block">
            <pre><code>let csrfRes = await fetch('/api/change_role', {
  method: 'POST',
  credentials: 'include',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ dummy: 1 })
});
if (!csrfRes.ok) throw new Error('권한 상승 실패: ' + csrfRes.status);</code></pre>
          </q-card>
          <ul>
            <li>
              <span style="color: red">fetch('/api/change_role', …): change_role</span> API
              엔드포인트로 POST오쳥을 보냄
            </li>
            <li>
              <span style="color: red">credentials: 'include’</span>: 이미 발급된 세션 쿠키를 함께
              전송해 "로그인 된 상태"임을 서버에 알림
            </li>
            <li>
              <span style="color: red">headers: {'Content-Type':'application/json'}</span>: 요청
              본문이 JSON 임을 명시
            </li>
            <li>
              <span style="color: red">body: JSON.stringify({ dummy: 1 })</span>: 실제 CSRF 토큰
              대신 <span style="color: red">dummy</span> 필드만 보내도록 구성
            </li>
          </ul>

          <strong>4. 플래그 획득</strong>
          <ul class="q-mt-none">
            <li>
              마지막에 <span style="color: red">/flag.php</span> 로 이동해
              <span style="color: red">/api/flag</span> 호출 시 권한 체크를 통과하고 플래그를
              출력합니다.
            </li>
          </ul>

          <strong>5. 보안 교훈</strong>
          <ul class="q-mt-none">
            <li>CSRF 보호 로직은 “토큰이 <strong>없으면</strong> 무조건 실패”해야 하며,</li>
            <li>
              <span style="color: red">if token:</span> 같은 조건문으로 검증을 건너뛰면 치명적
              취약점이 발생합니다.
            </li>
          </ul>
        </div>
        <q-separator spaced />

        <q-card-section>
          <div class="text-h5 text-weight-bold">🌟CSRF 간단 요약</div>
        </q-card-section>

        <div class="text-h6 q-pl-md">
          <div>
            ✅ CSRF는 공격자가 피해자의 브라우저를 통해 사용자의 세션 쿠키가 자동으로 포함된 인증된
            요청을 몰래 전송<br />하도록 유도하는 취약점입니다.
          </div>
          <div>
            ✅ 공격자는 악성 페이지에서 자동으로 HTTP 요청을 발생시키고, 브라우저가 세션 쿠키를 함께
            보내 서버가 <br />이를 정상 요청으로 처리하게 만듭니다.
          </div>
          <div>
            ✅ 웹 애플리케이션이 요청의 출처를 검증하지 않거나 CSRF 토큰·SameSite 설정을 사용하<br />지
            않을 때 발생합니다.
          </div>
          <div>
            ✅ 가장 효과적인 방어는 예측 불가능한 CSRF 토큰 검증이며, 이 외에도 SameSite 쿠키 설<br />
            정, Referer/Origin 검사, 민감 동작 시 비밀번호 재확인 등을 적용할 수 있습니다.
          </div>
        </div>
        <q-separator spaced />
        <!-- Footer (돌아가기) -->
        <q-card-section>
          <q-btn flat icon="arrow_back" label="돌아가기" @click="goBack" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
//import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 예시 코드/명령어

function goBack() {
  router.back()
}
</script>

<style scoped>
.war-game-explanation-page {
  background-color: #f4f4f4;
  min-height: 100vh;
}

.code-block {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}
</style>
