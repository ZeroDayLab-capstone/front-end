<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">📖해설</div>
            <div class="text-h6 q-pl-lg">
              <div>
                1.
                <strong>저장형 XSS</strong>를 이용하여 <span style="color: red">view.php</span>에서
                <span style="color: red">{{ scripttag }}</span> 가 실행됨
              </div>
              <div class="q-py-sm">
                2. <strong>Selenium 관리자 봇</strong>은 미리 정의된 관리자 세션(
                <span style="color: red">ADMINID</span> )으로 해당 게시글을 열람
              </div>
              <div>
                3. 스크립트가 실행되며 관리자 쿠기가
                <span style="color: red">attacker_server.php</span>로 전송됨
              </div>
              <div class="q-py-sm">
                4. 사용자가 탈취한 세션 쿠키를
                <span style="color: red">claim_admin_session.php</span> 에 제출하면
                <span style="color: red">$_COOKIE</span>에 주입<br />되어 관리자처럼 동작 가능
              </div>
              <div>
                5. 관리자만 볼 수 있는 게시글에 접근할 수 있으며, 이 게시글에 FLAG가 포함되어 있음
              </div>
            </div>
          </q-card-section>
          <q-separator spaced />
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟XSS 간단 요약</div>
            <!-- 요약약 본문 -->

            <div class="text-h6 q-pl-md">
              <div class="q-pt-md">
                ✅ XSS는 공격자가 <strong>악의적인 스크립트를 웹 페이지에 삽입</strong>하여 사용자의
                브라우저에서 실행되도록 유도하는 <br />클라이언트 측 코드 인젝션 취약점입니다.
              </div>
              <div>
                ✅ 사용자 입력을 HTML·JavaScript 콘텍스트별로 적절히 이스케이프하거나 필터링하지
                않을 때 발생하며,<br />
                <span style="color: red">innerHTML·document.write()</span> 같은 안전하지 않은 API
                사용이 주요 원인입니다.
              </div>
              <div>
                ✅ 이로 인해 쿠키 탈취, 세션 하이재킹, UI 변조, 강제 리디렉션 등 피해가 발생할 수
                있습니다.
              </div>
              <div>
                ✅ 가장 효과적인 방어는 컨텍스트별 출력 이스케이프, CSP 적용, 안전한 DOM
                API(textContent 등) 사용입니다.
              </div>
            </div>
          </q-card-section>
          <q-separator spaced />

          <!-- Footer (돌아가기) -->
          <q-card-section>
            <q-btn flat icon="arrow_back" label="돌아가기" @click="goBack" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scripttag = ref('<script>')

function goBack() {
  router.back()
}
</script>

<style scoped>
.war-game-explanation-page {
  background-color: #f4f4f4;
  min-height: 100vh;
}
</style>
