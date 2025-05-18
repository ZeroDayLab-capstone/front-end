<template>
  <q-page class="q-pa-md war-game-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="bg-white text-dark shadow-1">
          <!-- 해설 헤더 -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">해설📖</div>
          </q-card-section>
          <q-separator spaced />

          <!-- 해설 본문 + 선택적 코드 예시 -->
          <q-card-section>
            <!-- 1) 수동 마크업된 해설 -->
            <div class="text-body1 q-pl-lg">
              <div style="display: list-item; list-style-type: disc">
                서버는 사용자의 입력을 쉘 명령어에 직접 삽입하고 있습니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                입력값 뒤에 <span style="color: red">;, |, &&</span> 등을 사용하면 추가 명령어를
                실행할 수 있습니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                <span style="color: red">
                  /flag.txt는 플래그가 저장된 파일이며, 이를 읽기 위해 명령어 주입이 활용됩니다.
                </span>
              </div>
              <div style="display: list-item; list-style-type: disc">
                필터링 미비는 웹쉘 업로드, 시스템 파괴 등 치명적인 공격으로 이어질 수 있습니다.
              </div>
            </div>

            <!-- 2) attackCode가 있을 때만 나오는 코드/명령 예시 -->
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
