<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">해설📖</div>
            <!-- 1) 수동 마크업된 해설 -->
            <div class="text-body1 q-pl-md">
              <div>1. <strong>서버 측 필터링 없음</strong></div>
              <div class="q-pl-lg">
                <div style="display: list-item; list-style-type: disc">
                  게시글 내용에 HTML 태그와 스크립트가 그대로 저장됨
                </div>
              </div>
              <div class="q-pt-md">2. <strong>취약점 핵심</strong></div>
              <div class="q-pl-lg">
                <div style="display: list-item; list-style-type: disc">
                  저장된 게시글을 열람할 때 <code style="color: red">{{ scripttag }}</code> 또는
                  <code style="color: red">{{ imgtag }}</code> 태그가 <br />HTML로 렌더링되어 그대로
                  실행됨
                </div>
              </div>
              <div class="q-pt-md">3. <strong>브라우저 실행 결과</strong></div>
              <div class="q-pl-lg">
                <div style="display: list-item; list-style-type: disc">
                  사용자가 해당 게시글을 조회하는 순간 브라우저가 JavaScript 코드를 실행함
                </div>
                <div style="display: list-item; list-style-type: disc">
                  이미 가장 단순하면서도 흔한 Stored XSS 형태임
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟XSS 간단 요약</div>
            <!-- 요약약 본문 -->

            <div class="text-body1 q-pl-md">
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
const imgtag = ref('<img onerror>')

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
