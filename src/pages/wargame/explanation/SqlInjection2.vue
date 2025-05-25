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
            <div class="text-h6">
              <div>1. <strong>기본 조회 확인</strong></div>
              <div class="q-pl-md">
                <div>
                  a. 프론트 페이지( <span style="color: red">http://localhost:8081</span> )에서 ID
                  입력창에 <span style="color: red">4</span> 입력 후 조회
                </div>
                <div>
                  b. 응답으로 <span style="color: red">사용자 정보: admin_user</span> 가 반환되는
                  것을 확인합니다.
                </div>
                <div>
                  c. 이로써 SQL Injection이 가능한 취약점(
                  <span style="color: red">SELECT nickname FROM users WHERE id = '…'</span> )이
                  존재함을 알 수 있습니다.
                </div>
              </div>

              <div class="q-pt-sm">2. <strong>플래그 위치 파악</strong></div>
              <div class="q-pl-md">
                <div>
                  a. 플래그는 flags 테이블에 숨겨져 있으며, 일반 조회(
                  <span style="color: red">SELECT nickname …</span> )로는 노출되지 않습니다.
                </div>
                <div>
                  b. 따라서 Blind SQL Injection (Time-based) 기법을 사용해 한 글자씩 추출해야
                  합니다.
                </div>
              </div>

              <div class="q-pt-sm">3. <strong>Time-based Blind SQL Injection 원리</strong></div>
              <div class="q-pl-md">
                <div>
                  a. SQLite에는 <span style="color: red">SLEEP()</span> 함수가 없으므로, 파이썬
                  <span style="color: red">time.sleep()</span>을
                  <span style="color: red">sleep</span> 이름으로 등록해 두었습니다.
                </div>
                <div>
                  b. 조건이 참일 때 <span style="color: red">sleep(1)</span> 을 호출하면, 응답
                  시간이 약 1초 지연됩니다.
                </div>
                <div>지연 발생 여부로 <strong>참/거짓</strong>을 판별하여 문자를 추출합니다.</div>
                <q-card flat bordered class="code-block">
                  <pre><code>… WHERE id = '4'
  AND (
    CASE
      WHEN substr((SELECT flag FROM flags), P, 1) = 'C'
      THEN sleep(1)
      ELSE 0
    END
  )--</code></pre>
                </q-card>
                <ul>
                  <li>
                    <span style="color: red">P</span>: 플래그 문자열에서 확인할
                    <strong>위치</strong>(1부터 시작)
                  </li>
                  <li>
                    <span style="color: red">C</span>: <strong>추측할 문자</strong>(예:
                    <span style="color: red">F, L, {, A</span> 등)
                  </li>
                </ul>
              </div>

              <div>4. <strong>한 글자씩 추출하기</strong></div>
              <div class="q-pl-md">
                <div>a. P = 1(첫 글자)</div>
                <ul class="q-mt-none">
                  <li>URL:</li>

                  <q-card flat bordered class="code-block">
                    <pre><code>http://localhost:8081/?id=4' AND (
  CASE WHEN substr((SELECT flag FROM flags),1,1)='F' THEN sleep(1) ELSE 0 END
)--</code></pre>
                  </q-card>
                  <li>약 1초 지연 => 첫 글자는 <span style="color: red">F</span></li>
                </ul>
                <div>b. <strong>P = 2</strong>(두 번째 글자)</div>
                <ul class="q-mt-none">
                  <li>
                    <span style="color: red">'L'</span> 여부 테스트 -> 지연 발생 =>
                    <span style="color: red">L</span>
                  </li>
                </ul>

                <div>
                  c. <strong>P = 3,4,5...</strong> 순차적으로
                  <span style="color: red">'A', 'G', '{'</span> 를 확인
                </div>
                <div class="q-py-md">
                  d. wndrks <strong>8글자</strong>( <span style="color: red">AB12CD34</span> ) 는
                  후보 문자 집합 (<span style="color: red">0-9, A-Z</span> ) 을 순회하며 지연을 통해
                  하나씩 확정
                </div>
                <div>
                  e. 마지막 <strong>P = 10</strong>: <span style="color: red">'}'</span>확인 -> 지연
                  발생 => <span style="color: red"> }</span>
                </div>
                <div>➡️ 이 과정을 통해 최종적으로 FLAG{AB12CD34} 획득할 수 있습니다.</div>
              </div>
            </div>
          </q-card-section>

          <q-separator spaced />
          <q-card-section>
            <div class="text-h5 text-weight-bold">🌟SQL Injection 간단 요약</div>
          </q-card-section>

          <div class="text-h6 q-pl-lg">
            <div>
              ✅ SQL Injection은 웹 애플리케이션이 사용자 입력값을 검증 없이 SQL 쿼리에 포함시켜
              공격자가 악의적 SQL 명령을 실행할 수 있는 취약점입니다.
            </div>
            <div>
              ✅ 이를 통해 데이터베이스에서 민감 정보를 탈취하거나, 데이터 조작·삭제 등 권한 없는
              작업을 수행할 수 있습니다.
            </div>
            <div>
              ✅ 로그인 폼, 검색 기능, URL 매개변수 등 동적 SQL을 사용하는 모든 웹 애플리케이션에서
              발생하며, 입력 검증 부족, 동적 쿼리 사용, 최소 권한 미적용 등이 주요 원인입니다.
            </div>
            <div>
              ✅ Prepared Statement(파라미터 바인딩), 입력값 필터링·검증, 최소 권한 원칙 적용, 에러
              메시지 숨기기, WAF 도입 등을 통해 효과적으로 방어할 수 있습니다.
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
.code-block {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}
</style>
