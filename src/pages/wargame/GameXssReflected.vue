<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-7">
        <q-card flat class="bg-grey-1 text-dark q-px-sm q-pb-sm">
          <!-- 헤더 (문제 제목, 난이도, etc.) -->
          <q-card-section>
            <div class="text-h5">{{ problemTitle }}</div>
            <div class="text-caption text-grey">사용 대상: 학습자</div>
            <q-badge
              v-if="difficulty"
              :label="difficultyLabel"
              :color="difficultyColor"
              class="q-mt-sm"
            />
          </q-card-section>

          <!-- 문제 목표 / 시나리오 설명 -->
          <q-separator spaced />
          <q-card-section>
            <div class="text-h5">1️⃣실습 목표🎯</div>
            <div class="text-h6">
              <ul class="q-mt-none">
                <li>Reflected XSS의 원리와 위험성을 이해합니다.</li>
                <li>입력값이 escape 없이 HTML에 반영될 때 발생하는 XSS를 실습합니다.</li>
                <li>
                  alert 실행 후 자동 리디렉션을 통해 보호된 페이지(flag.php)에 접근하여 FLAG를
                  획득하는 전체 흐름을 실습합니다.
                </li>
              </ul>
            </div>
            <div class="q-py-sm text-h5">2️⃣문제 시나리오🎭</div>
            <div class="text-h6">
              <div class="q-pb-sm">
                💡 당신은 검색 기능이 있는 웹 페이지에서, 검색어가 escape 없이 출력되는 것을
                발견했습니다.
              </div>
              <div>
                이 취약점을 이용하여 JavaScript가 실행되도록 만들고, alert 실행 후 보호된 페이지인
                <span style="color: red">flag.php</span>로 리디렉션 되도록 하세요.
                <span style="color: red">flag.php</span>는 <span style="color: red">Referer</span>가
                <span style="color: red">index.php</span>일 경우에만 FLAG를 보여줍니다. 목표는
                검색어 입력만으로 FLAG를 획득하는 것입니다.
              </div>
            </div>
          </q-card-section>

          <!-- 문제 난이도 표시 -->
          <q-separator spaced />
          <q-card-section>
            <div class="row items-center">
              <div class="col-4 text-bold">문제 난이도</div>
              <div class="col">
                <span>{{ difficultyLabel }}</span>
              </div>
            </div>
          </q-card-section>

          <!-- 힌트 섹션 (토글) -->
          <q-separator spaced />
          <q-expansion-item group="hint" icon="help_outline" label="힌트" expand-separator>
            <div class="q-mt-sm text-body1 q-pl-lg">
              <div style="display: list-item; list-style-type: disc">
                {{ payloadScript }} 또는 {{ payloadImg }} 등의 페이로드가 그대로 실행됩니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                FLAG는 <span style="color: red">flag.php</span>에서 출력되며, 단
                <span style="color: red">Referer</span>가
                <span style="color: red">index.php</span>인 경우에만 표시됩니다
              </div>
              <div style="display: list-item; list-style-type: disc">
                직접 <span style="color: red">flag.php</span> 를 여는 것이 아닌
                <span style="color: red">alert()</span> 실행 후 자동 이동 방식이 필요합니다
              </div>
              <div style="display: list-item; list-style-type: disc">
                JS 코드에 <span style="color: red">location='flag.php'</span> 같은 리디렉션을
                포함시켜야 정상적으로 흐름이 이어집니다
              </div>
            </div>
          </q-expansion-item>

          <!-- 정답 입력 / 결과 확인 -->
          <q-separator spaced />
          <q-card-section>
            <h6>문제 해결(정답) 입력</h6>
            <q-input v-model="userAnswer" filled placeholder="정답을 입력하세요" class="q-my-sm" />
            <div class="colunm q-gutter-x-sm">
              <q-btn label="제출" color="black" @click="onSubmitAnswer" />
              <q-btn
                label="해설"
                color="black"
                :to="{ name: 'WargameExplanationXssReflected' }"
              ></q-btn>
            </div>
            <div v-if="submitResult" class="q-mt-sm">
              <q-banner
                v-if="submitSuccess"
                type="positive"
                icon="check_circle"
                :label="successMessage"
              />
              <q-banner v-else type="negative" icon="warning" :label="failMessage" />
            </div>
          </q-card-section>
          <q-separator spaced />
          <q-card-section>
            <div class="text-h6">문제 관련 액션</div>
            <p class="text-body2 text-grey q-mt-sm">
              실습 환경을 생성하고, 문제를 직접 풀어볼 수 있습니다.
            </p>
          </q-card-section>

          <q-card-section>
            <!-- 서버 생성 버튼 -->
            <q-btn
              label="서버 생성"
              color="accent"
              icon="build"
              class="full-width q-my-sm"
              @click="onCreateServer"
            />
            <div v-if="serverCreated" class="text-positive q-my-sm">
              서버가 생성되었습니다! 실습 환경으로 이동해 보세요.
            </div>
            <!-- 문제 시작 버튼도 가능 -->
            <q-btn
              label="실습 시작"
              color="primary"
              icon="play_arrow"
              class="full-width q-my-sm"
              @click="onStartPractice"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth'

// 예시: 문제 정보
const problemTitle = ref('검색어 기반 XSS 실행을 통한 FLAG 획득')
const difficulty = ref('medium')
const payloadScript = '<script>alert(1)<' + '/script>'
const payloadImg = '<img src=x onerror=alert(1)' + '>'

const auth = useAuthStore()

const difficultyLabel = computed(() => {
  if (difficulty.value === 'easy') return '초급'
  if (difficulty.value === 'hard') return '고급'
  return '중급'
})
const difficultyColor = computed(() => {
  if (difficulty.value === 'easy') return 'green'
  if (difficulty.value === 'hard') return 'red'
  return 'orange'
})

const userAnswer = ref('')
const submitResult = ref(false)
const submitSuccess = ref(false)
const successMessage = ref('성공! 문제를 해결하셨습니다.')
const failMessage = ref('실패! 다시 시도해 보세요.')

async function onSubmitAnswer() {
  const email = auth.user?.email
  const labId = 9 // lab_id 고정(이 문제 기준)

  // 정답 비교 로직(임시로 '1234'가 정답)
  const correct = userAnswer.value.trim() === '9f8e7d6c5b4a392817261504030201ff'
  const status = correct ? 'completed' : 'in-progress'

  try {
    const res = await api.post('/labs/labs/submit', {
      email: email,
      lab_id: labId,
      is_correct: correct,
      status: status,
    })
    successMessage.value = '성공! 문제를 해결하셨습니다.'
    failMessage.value = '실패! 다시 시도해 보세요.'
    if (res.data && res.data.status) {
      successMessage.value = correct ? `성공! 서버 응답: ${res.data.status}` : successMessage.value
      failMessage.value = !correct ? `실패! 서버 응답: ${res.data.status}` : failMessage.value
    }
    submitSuccess.value = correct
    submitResult.value = true
  } catch (e) {
    submitSuccess.value = false
    submitResult.value = true
    failMessage.value = '서버 오류! 다시 시도해 주세요.'
    console.error(e)
  }
}

const serverCreated = ref(false)
const frontendPort = ref(null)
const frontendHost = '100.108.98.2' // 실습환경 도커 컨테이너 host (고정)

async function onCreateServer() {
  const email = auth.user?.email
  const lab_id = 9
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    await api.post('/labs/labs/environment', {
      email: email,
      lab_id: lab_id,
    })
    // 문제 id 고정(8번)
    const res = await api.post('/containers/start', { problem_id: lab_id })
    frontendPort.value = res.data.frontend_port
    serverCreated.value = true
  } catch (err) {
    serverCreated.value = false
    frontendPort.value = null
    alert('서버 생성에 실패했습니다.')
    console.error(err)
  }
}

function onStartPractice() {
  if (serverCreated.value && frontendPort.value) {
    window.open(`http://${frontendHost}:${frontendPort.value}/index.php`, '_blank')
  } else {
    alert('먼저 서버를 생성하세요!')
  }
}
</script>

<style scoped>
.problem-explanation-page {
  background-color: #f5f5f5;
  min-height: 100vh; /* 페이지 전체 높이 차지 */
}
.q-card {
  border-radius: 8px;
}
.full-width {
  width: 100%;
}
</style>
