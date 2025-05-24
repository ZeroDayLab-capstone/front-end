<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">📖해설</div>

            <div class="text-h6 q-pl-md">
              <div>
                1. 백앤드는 파일 확장자 제한 없이 모든 파일을
                <code style="color: red">/upload/</code>에 저장
              </div>
              <div>
                2. 프론트엔드는 Apache 설정상 <code style="color: red">/upload/</code>경로에 있는
                <code style="color: red">.php</code>파일도 실행 가능
              </div>

              <div>3. 공격자는 PHP로 작성된 간단한 RCE 스크립트를 업로드</div>
              <div>
                4. 해당 스크립트를 실행하면 서버 루트의 <code style="color: red">/flag.txt</code>를
                읽고 브라우저에 출력
              </div>
              <div>파일 실행에 실패할 경우 업로드 경로, 권한, 파일 확장자 등을 재확인</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟File vulnerability 간단 요약</div>
            <!-- 요약약 본문 -->

            <div class="text-h6 q-pl-md">
              <div class="q-pt-md">
                ✅ <strong>파일 업로드 취약점</strong>은
                <strong>경로·확장자·MIME 검증 미흡</strong>으로 <code style="color: red">../</code>
                <strong>경로 조작</strong>이나 <strong>악성 웹셸 업로드를 허용</strong>해<br />
                서버에서 임의 코드 실행이 가능한 취약점입니다.
              </div>
              <div>
                ✅ <strong>파일 다운로드 취약점</strong>은
                <strong>다운로드 파라미터를 검증 없이 경로에 사용해</strong>
                <code style="color: red">/etc/passwd</code> 등 <strong>민감 파일을 탈취</strong>
                <br />할 수 있는 Path Traversal 공격입니다.
              </div>
              <div>
                ✅ 두 취약점 모두 사용자 입력값을 파일 경로에 그대로 사용하면서 발생하며, 주요
                원인은 검증 부족과 화이 <br />트 리스트 미적용입니다.
              </div>
              <div>
                ✅ 방어 기법으로는 경로 정제·정규화, 확장자 화이트 리스트·MIME 검사, 파일명 난수화,
                실행 권한 제한, 서<br />버 내부 고정 경로 사용 등을 적용해야 합니다.
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
