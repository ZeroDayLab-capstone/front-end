<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5">{{ explanationTitle }}</div>
            <div class="text-subtitle2 text-grey">Wargame 문제 해설</div>
          </q-card-section>
          <q-separator spaced />

          <!-- 해설 본문 -->
          <q-card-section>
            <p class="text-body1" v-html="sanitizedHTML(solutionContent)"></p>

            <!-- 코드/명령어 예시 (선택사항) -->
            <div v-if="attackCode" class="q-my-lg">
              <h6>예시 코드/명령</h6>
              <q-markup-table :dark="false">
                <tbody>
                  <tr>
                    <td>
                      <pre>{{ attackCode }}</pre>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card-section>

          <q-separator spaced />

          <!-- Footer -->
          <q-card-section>
            <q-btn label="돌아가기" color="primary" icon="arrow_back" @click="goBack" />
            <q-btn
              label="다음 문제"
              color="accent"
              icon="arrow_forward"
              class="q-ml-sm"
              @click="goNextProblem"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'

// 라우터
const router = useRouter()

// 해설 제목
const explanationTitle = ref('War Game 문제 해설: XX 취약점')
// 실제 해설 HTML
const solutionContent = ref(`
  <p>이 문제는 <strong>SQL Injection</strong> 기법을 익히기 위해 만들어졌습니다.</p>
  <p>주요 취약점 포인트는 DB 쿼리에서 사용자 입력을 검증하지 않아 발생합니다.</p>
  <ol>
    <li>로그인 폼에 <code>' OR '1'='1</code> 형태로 넣어서 우회 가능</li>
    <li>데이터베이스 에러 메시지를 통해 테이블 구조를 유추</li>
    <li>등등... 해설 상세 내용</li>
  </ol>
  <p>이를 방어하려면 Prepared Statement를 사용하고, 입력 값을 필터링해야 합니다.</p>
`)

// (선택) 공격 코드/명령어 예시
const attackCode = ref(`
# 공격 예시
SELECT * FROM users WHERE id = '' OR '1'='1';

# 혹은 공격 페이로드:
' OR '1'='1 --
`)

// DOMPurify 이용
function sanitizedHTML(rawHtml) {
  return DOMPurify.sanitize(rawHtml)
}

// 돌아가기
function goBack() {
  router.back()
}

// 다음 문제로 이동(예시)
function goNextProblem() {
  router.push('/wargame/next-problem')
}
</script>

<style scoped>
.war-game-explanation-page {
  background-color: #f4f4f4;
  min-height: 100vh;
}
</style>
