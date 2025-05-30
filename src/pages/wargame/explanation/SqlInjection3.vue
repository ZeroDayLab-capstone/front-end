<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">📖해설</div>
            <!-- 해설 본문 -->
            <div class="text-h6">
              <span class="text-weight-bold">1. 컬럼 개수 파악</span>
              <div class="q-pl-md">
                <span style="color: red">ORDER BY 1--</span>,
                <span style="color: red">ORDER BY 3--</span> 등을 시도하여 컬럼 개수가 3개임을
                확인합니다.
              </div>
              <div class="q-pt-sm">
                <span class="text-weight-bold">2. 데이터 타입 매핑</span>
              </div>
              <ul class="q-mt-none">
                <li><span style="color: red">name</span> 컬럼: 문자열(VARCHAR)</li>
                <li><span style="color: red">description</span> 컬럼: 텍스트(TEXT)</li>
                <li><span style="color: red">price</span> 컬럼: 숫자(DECIMAL)</li>
              </ul>

              <div><strong>3. UNION SELECT 구성</strong></div>
              <div class="q-pl-md">
                위 타입에 맞춰 더미값(<span style="color: red">'dummy'</span>,
                <span style="color: red">0</span>)을 채우고,
                <span style="color: red">flags</span> 테이블의
                <span style="color: red">flag</span> 컬럼을 세 번째 컬럼에 매핑합니다.
              </div>
              <div class="q-pt-sm"><strong>4. 플래그 노출</strong></div>
              <div class="q-pl-md">
                최종 페이로드로
                <span style="color: red"
                  >/product.php?id=1 UNION SELECT flag,'dummy',0 FROM flags--</span
                >를 전송하면, 웹 페이지에 <strong>FLAG{…}</strong> 형태의 플래그가 출력됩니다.
              </div>
            </div>
          </q-card-section>
          <q-separator spaced />
          <q-card-section>
            <div class="text-h5 text-weight-bold q-pb-md">🌟SQL Injection 간단 요약</div>

            <div class="text-h6 q-pl-md">
              <div>
                ✅ SQL Injection은 웹 애플리케이션이
                <strong>사용자 입력값을 검증 없이 SQL 쿼리에 포함</strong>시켜 공<br />격자가
                <strong>악의적 SQL 명령</strong>을 실행할 수 있는 취약점입니다.
              </div>
              <div>
                ✅ 이를 통해 데이터베이스에서 민감 정보를 탈취하거나, 데이터 조작·삭제 등 권한 없는
                작업<br />을 수행할 수 있습니다.
              </div>
              <div>
                ✅ 로그인 폼, 검색 기능, URL 매개변수 등 동적 SQL을 사용하는 모든 웹
                애플리케이션에서
                <br />발생하며, 입력 검증 부족, 동적 쿼리 사용, 최소 권한 미적용 등이 주요
                원인입니다.
              </div>
              <div>
                ✅ Prepared Statement(파라미터 바인딩), 입력값 필터링·검증, 최소 권한 원칙 적용,
                에러 메<br />시지 숨기기, WAF 도입 등을 통해 효과적으로 방어할 수 있습니다.
              </div>
            </div>
          </q-card-section>
          <q-separator spaced />

          <!-- 돌아가기 버튼 -->
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
