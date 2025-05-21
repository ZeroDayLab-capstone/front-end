<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">해설📖</div>

            <ul class="text-body1 q-mt-none q-pt-none">
              <li>서버는 사용자의 입력을 쉘 명령어에 직접 삽입하고 있습니다.</li>
              <li>
                입력값 뒤에 <code style="color: red">;, |, &&</code> 등을 사용하면 추가 명령어를
                실행할 수 있습니다.
              </li>
              <li>
                <code style="color: red">/flag.txt</code>는 플래그가 저장된 파일이며, 이를 읽기 위해
                명령어 주입이 활용됩니다.
              </li>
              <li>
                필터링 미비는 <strong>웹 쉘 업로드, 시스템 파괴 등 치명적인 공격</strong>으로 이어질
                수 있습니다.
              </li>
            </ul>
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟Command Injection 간단 요약</div>
            <!-- 요약약 본문 -->

            <div class="text-body1 q-pl-md">
              <div class="q-pt-md">
                ✅ Command Injection은 웹 애플리케이션이 <strong>사용자 입력을 검증 없이</strong>
                <code style="color: red">system(), exec()</code> 등의 함수로 직 <br />접 전달할 때
                발생하는 취약점으로, 공격자가 <strong>쉘 메타문자</strong>를 이용해 임의의 시스템
                명령을 실행할 수 있습니다.
              </div>
              <div class="q-py-sm">
                ✅ 이를 통해 서버 권한 탈취, 파일 유출·조작, 리버스 쉘 생성 등 치명적인 피해가
                발생하며, <code style="color: red">ping</code>, 파일 백업, <br />관리자 기능 등
                시스템 명령 실행 기능 전반에서 주로 발견됩니다.
              </div>
              <div>
                ✅ 주요 원인은 입력값 검증 부족과 메타문자 처리 미흡이며, 메타문자
                필터링·이스케이프, 최소 권한 원칙 적용, <br />안전한 API 사용, WAF 도입 등으로
                효과적으로 방어할 수 있습니다.
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
//import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
