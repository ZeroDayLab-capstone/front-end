<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">해설 📖</div>
          </q-card-section>
          <q-separator spaced />

          <!-- 해설 본문 -->
          <q-card-section>
            <div class="text-body1 q-pl-md">
              <div style="display: list-item; list-style-type: disc">
                컬럼 개수 파악: <code style="color: red">ORDER BY 1--</code>,
                <code style="color: red">ORDER BY 3--</code> 등을 시도하여 컬럼 개수가 3개임을
                확인합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                데이터 타입 매핑:
                <ul>
                  <li><code style="color: red">name</code> 컬럼: 문자열(VARCHAR)</li>
                  <li><code style="color: red">description</code> 컬럼: 텍스트(TEXT)</li>
                  <li><code style="color: red">price</code> 컬럼: 숫자(DECIMAL)</li>
                </ul>
              </div>
              <div style="display: list-item; list-style-type: disc">
                <strong>UNION SELECT 구성:</strong> 위 타입에 맞춰 더미값(<code style="color: red"
                  >'dummy'</code
                >, <code style="color: red">0</code>)을 채우고,
                <code style="color: red">flags</code> 테이블의
                <code style="color: red">flag</code> 컬럼을 세 번째 컬럼에 매핑합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                플래그 노출: 최종 페이로드로
                <code style="color: red"
                  >/product.php?id=1 UNION SELECT flag,'dummy',0 FROM flags--</code
                >를 전송하면, 웹 페이지에 <strong>FLAG{…}</strong> 형태의 플래그가 출력됩니다.
              </div>
            </div>
          </q-card-section>

          <!-- 예시 코드/명령 (항상 표시) -->
          <q-card-section class="q-my-lg">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 예시 코드/명령어
const attackCode = ref(`\
# 공격 예시
ls -al; cat /flag.txt

# 또는
cat /flag.txt
`)

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
