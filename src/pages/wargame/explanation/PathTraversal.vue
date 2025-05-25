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
                1. 업로드된 파일은 <code style="color: red">uploads/</code>디렉토리에 저장되고, 읽을
                때 <code style="color: red">read.php</code>에서 파일명을 쿼리 파라미터로 전달
              </div>
              <div class="q-py-sm">
                2. 백앤드는 해당 이름을 그대로 <code style="color: red">uploads/</code> 하위 경로에
                붙여 파일을 열람
              </div>
              <div>
                3. 경로 필터링이 업로드 시에는 존재하지만, 읽기 시에는 적용되지 않아
                <code style="color: red">../</code> 우회가 가능
              </div>
              <div class="q-py-sm">
                4. 이를 통해 <code style="color: red">uploads/../flag.py</code> 경로로 상위
                디렉토리의 <code style="color: red">flag.py</code> 파일을 열람
              </div>
              <div>
                5. <code style="color: red">flag.py</code> 파일은 출력 가능한 텍스트 파일이며,
                내부에 FLAG 문자열이 포함되어 있음
              </div>
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
