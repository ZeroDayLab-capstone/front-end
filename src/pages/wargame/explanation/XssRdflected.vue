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
                1. <code style="color: red">index.php</code>는 검색어 파라미터
                <code style="color: red">q</code>를 그대로 HTML에 삽입함
              </div>
              <div class="q-py-sm">
                2. <code style="color: red">{{ scripttag }}</code> 태그가 그대로 반영되면서
                JavaScript 실행 가능
              </div>
              <div>
                3. 페이지에 포함된 <code style="color: red">javaScript</code> 는 alert 발생 후
                <code style="color: red">flag.php</code>로 자동 리디렉션 수행
              </div>
              <div class="q-py-sm">
                4. 이 때 <code style="color: red">Referer</code>이
                <code style="color: red">index.php</code>이므로
                <code style="color: red">flag.php</code>는 정상적으로 FLAG를 출력
              </div>
              <div>
                5. 만약 직접 <code style="color: red">flag.php</code>를 열 경우 Referer이 없으므로
                FlAG는 숨겨짐
              </div>
            </div>
          </q-card-section>
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
                <code style="color: red">innerHTML·document.write()</code> 같은 안전하지 않은 API
                사용이 주요 원인입니다.
              </div>
              <div>
                ✅ 이로 인해 쿠키 탈취, 세션 하이재킹, UI 변조, 강제 리디렉션 등 피해가 발생할 수
                있습니다.
              </div>
              <div>
                ✅ 가장 효과적인 방어는 컨텍스트별 출력 이스케이프, CSP 적용, 안전한 DOM
                API(textContent 등) 사용입<br />니다.
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
