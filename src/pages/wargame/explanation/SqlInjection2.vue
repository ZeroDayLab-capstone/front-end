<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">📖해설</div>
          </q-card-section>

          <!-- 해설 본문 + 선택적 코드 예시 -->
          <q-card-section>
            <!-- 1) 수동 마크업된 해설 -->
            <ul class="text-body1">
              <li>서버는 사용자의 입력을 쉘 명령어에 직접 삽입하고 있습니다.</li>
              <li>
                입력값 뒤에 <span style="color: red">;, |, &&</span> 등을 사용하면 추가 명령어를
                실행할 수 있습니다.
              </li>
              <li>
                <span style="color: red">
                  /flag.txt는 플래그가 저장된 파일이며, 이를 읽기 위해 명령어 주입이 활용됩니다.
                </span>
              </li>
              <li>
                필터링 미비는 웹쉘 업로드, 시스템 파괴 등 치명적인 공격으로 이어질 수 있습니다.
              </li>
            </ul>
          </q-card-section>

          <q-separator spaced />
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟SQL Injection 간단 요약</div>
          </q-card-section>

          <ul class="text-body1">
            <li>
              ✅ SQL Injection은 웹 애플리케이션이 사용자 입력값을 검증 없이 SQL 쿼리에 포함시켜
              공<br />격자가 악의적 SQL 명령을 실행할 수 있는 취약점입니다.
            </li>
            <li>
              ✅ 이를 통해 데이터베이스에서 민감 정보를 탈취하거나, 데이터 조작·삭제 등 권한 없는
              작업<br />을 수행할 수 있습니다.
            </li>
            <li>
              ✅ 로그인 폼, 검색 기능, URL 매개변수 등 동적 SQL을 사용하는 모든 웹 애플리케이션에서
              <br />발생하며, 입력 검증 부족, 동적 쿼리 사용, 최소 권한 미적용 등이 주요 원인입니다.
            </li>
            <li>
              ✅ Prepared Statement(파라미터 바인딩), 입력값 필터링·검증, 최소 권한 원칙 적용, 에러
              메<br />시지 숨기기, WAF 도입 등을 통해 효과적으로 방어할 수 있습니다.
            </li>
          </ul>

          <q-separator spaced />

          <!-- 4) 돌아가기 버튼 -->
          <q-card-section>
            <q-btn flat icon="arrow_back" label="돌아가기" @click="goBack" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
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
