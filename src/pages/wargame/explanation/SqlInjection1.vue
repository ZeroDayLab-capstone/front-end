<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 1) 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">해설 📖</div>
          </q-card-section>
          <q-separator spaced />

          <!-- 2) 해설 본문 -->
          <q-card-section>
            <div class="text-body1 q-pl-md">
              <div style="display: list-item; list-style-type: disc">
                서버는 다음과 같은 SQL 쿼리를 사용합니다:
              </div>
            </div>
            <pre class="q-pa-sm bg-grey-2">
SELECT * FROM users WHERE username = '입력값' AND password = '입력값';
            </pre>

            <div class="text-body1 q-pl-md q-mt-md">
              <div style="display: list-item; list-style-type: disc">
                공격자는 Username에 <code style="color: red">admin' --</code>를 입력하면 다음과 같이
                변환됩니다:
              </div>
            </div>
            <pre class="q-pa-sm bg-grey-2">
SELECT * FROM users WHERE username = 'admin' -- ' AND password = '';
            </pre>

            <div class="text-body1 q-pl-md q-mt-md">
              <div style="display: list-item; list-style-type: disc">
                <code style="color: red">--</code>는 SQL 주석 처리 구문이므로 뒤의
                <code style="color: red">AND password = …</code> 부분은 무시됩니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                따라서 <code style="color: red">username='admin'</code> 조건만으로 쿼리가 수행되어,
                비밀번호 체크 없이 관리자 로그인에 성공합니다.
              </div>
            </div>
          </q-card-section>

          <!-- 3) 예시 코드/명령 (항상 표시) -->
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
