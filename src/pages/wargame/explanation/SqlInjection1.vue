<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 1) 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">📖해설</div>
            <div class="text-h6">
              <div class="q-pl-lg">
                <div style="display: list-item; list-style-type: disc">
                  서버는 다음과 같은 SQL 쿼리를 사용합니다:
                </div>
              </div>
              <pre class="q-pa-sm bg-grey-2">
SELECT * FROM users WHERE username = '입력값' AND password = '입력값';
            </pre
              >

              <div class="q-pl-lg q-mt-md">
                <div style="display: list-item; list-style-type: disc">
                  공격자는 Username에 <code style="color: red">admin' --</code>를 입력하면 다음과
                  같이 변환됩니다:
                </div>
              </div>
              <pre class="q-pa-sm bg-grey-2">
SELECT * FROM users WHERE username = 'admin' -- ' AND password = '';
            </pre
              >

              <div class="q-pl-lg q-mt-md">
                <div style="display: list-item; list-style-type: disc">
                  <code style="color: red">--</code>는 SQL 주석 처리 구문이므로 뒤의
                  <code style="color: red">AND password = …</code> 부분은 무시됩니다.
                </div>
                <div style="display: list-item; list-style-type: disc">
                  따라서 <code style="color: red">username='admin'</code> 조건만으로 쿼리가
                  수행되고, 비밀번호는 확인하지 않게 됩니다.
                </div>
                <div style="display: list-item; list-style-type: disc">
                  결과적으로 인증 없이 관리자 계정으로 로그인에 성공하게 됩니다.
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟SQL Injection 간단 요약</div>
          </q-card-section>

          <div class="text-h6 q-pl-md">
            <div>
              ✅ SQL Injection은 웹 애플리케이션이 사용자 입력값을 검증 없이 SQL 쿼리에 포함시켜
              공<br />격자가 악의적 SQL 명령을 실행할 수 있는 취약점입니다.
            </div>
            <div>
              ✅ 이를 통해 데이터베이스에서 민감 정보를 탈취하거나, 데이터 조작·삭제 등 권한 없는
              작업<br />을 수행할 수 있습니다.
            </div>
            <div>
              ✅ 로그인 폼, 검색 기능, URL 매개변수 등 동적 SQL을 사용하는 모든 웹 애플리케이션에서
              <br />발생하며, 입력 검증 부족, 동적 쿼리 사용, 최소 권한 미적용 등이 주요 원인입니다.
            </div>
            <div class="q-pb-lg">
              ✅ Prepared Statement(파라미터 바인딩), 입력값 필터링·검증, 최소 권한 원칙 적용, 에러
              메<br />시지 숨기기, WAF 도입 등을 통해 효과적으로 방어할 수 있습니다.
            </div>
          </div>

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
