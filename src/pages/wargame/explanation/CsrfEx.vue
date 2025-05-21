<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="col-12 col-md-10 col-lg-8">
      <q-card flat bordered class="bg-white text-dark shadow-1">
        <!-- 해설 헤더 -->
        <q-card-section>
          <div class="text-h5 text-weight-bold">해설📖</div>
        </q-card-section>

        <!-- 해설 본문 + 선택적 코드 예시 -->
        <!-- 1) 수동 마크업된 해설 -->
        <ul class="text-body1">
          <li>서버는 사용자의 입력을 쉘 명령어에 직접 삽입하고 있습니다.</li>
          <li>
            입력값 뒤에 <span style="color: red">;, |, &&</span> 등을 사용하면 추가 명령어를 실행할
            수 있습니다.
          </li>
          <li>
            <span style="color: red">
              /flag.txt는 플래그가 저장된 파일이며, 이를 읽기 위해 명령어 주입이 활용됩니다.
            </span>
          </li>
          <li>필터링 미비는 웹쉘 업로드, 시스템 파괴 등 치명적인 공격으로 이어질 수 있습니다.</li>
        </ul>
        <q-separator spaced />

        <q-card-section>
          <div class="text-h5 text-weight-bold">🌟CSRF 간단 요약</div>
        </q-card-section>

        <ul class="text-body1">
          <li>
            ✅ CSRF는 공격자가 피해자의 브라우저를 통해 사용자의 세션 쿠키가 자동으로 포함된 인증된
            요청을 몰래 전송<br />하도록 유도하는 취약점입니다.
          </li>
          <li>
            ✅ 공격자는 악성 페이지에서 자동으로 HTTP 요청을 발생시키고, 브라우저가 세션 쿠키를 함께
            보내 서버가 <br />이를 정상 요청으로 처리하게 만듭니다.
          </li>
          <li>
            ✅ 웹 애플리케이션이 요청의 출처를 검증하지 않거나 CSRF 토큰·SameSite 설정을 사용하<br />지
            않을 때 발생합니다.
          </li>
          <li>
            ✅ 가장 효과적인 방어는 예측 불가능한 CSRF 토큰 검증이며, 이 외에도 SameSite 쿠키 설<br />
            정, Referer/Origin 검사, 민감 동작 시 비밀번호 재확인 등을 적용할 수 있습니다.
          </li>
        </ul>
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
</style>
