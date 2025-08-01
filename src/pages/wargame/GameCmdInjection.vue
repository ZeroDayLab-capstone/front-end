<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-7">
        <q-card flat class="text-dark q-px-sm q-pb-sm">
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
            <div class="text-h6 q-pl-md">
              <ul>
                <li>사용자가 입력값이 시스템 명령어에 직접 삽입되는 상황을 이해합니다.</li>
                <li>
                  <span style="color: red">{{ problemObjective }}</span> 등의 기법을 이용해 명령어
                  주입 공격을 수행합니다.
                </li>
              </ul>
            </div>
            <div class="q-pt-md text-h5">2️⃣문제 시나리오🎭</div>
            <div class="q-pa-md text-h6">
              <div>
                당신은 관리자로부터 내부 시스템의 파일 백업 여부를 확인해달라는 요청을 받았습니다.
              </div>
              <div>
                사이트에는 특정 디렉토리에 존재하는 파일 목록을 출력해주는 페이지가 있습니다.
                사용자는 다음
              </div>
              <div>과 같은 방식으로 디렉토리를 선택할 수 있습니다</div>
              <div class="q-py-lg">http://[서버]/list.php?dir=documents</div>
              <div>서버는 내부적으로 다음과 같은 명령어를 실행합니다.</div>
              <div class="q-py-lg">ls /var/www/uploads/[입력값]</div>
              <div>
                그러나 입력값에 대한 필터링이 제대로 이루어지지 않아 명령어 주입이 가능합니다. 이를
                이용해 서
              </div>
              <div>버의 <span style="color: red">/flag.txt</span> 파일을 읽어보세요.</div>
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
            <div class="q-mt-sm">
              <p>{{ hintText }}</p>
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
                :to="{ name: 'WargameExplanationCmdInjection' }"
              ></q-btn>
            </div>

            <div v-if="submitResult" class="q-mt-sm">
              <div v-if="submitSuccess" style="color: green">{{ successMessage }}</div>
              <div v-else style="color: red">{{ failMessage }}</div>
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

// 문제 정보
const problemTitle = ref('명령어 주입으로 플래그 탈취')
const problemObjective = ref(';, |, &&, $(...), `...`')
const difficulty = ref('medium')
const hintText = ref('; 기호는 한 줄에 여러 명령어를 순차 실행할 수 있게 해줍니다.')

const auth = useAuthStore()

// 난이도 표시용
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

// 정답 제출 관련
const userAnswer = ref('')
const submitResult = ref(false)
const submitSuccess = ref(false)
const successMessage = ref('성공! 문제를 해결하셨습니다.')
const failMessage = ref('실패! 다시 시도해 보세요.')

async function onSubmitAnswer() {
  const email = auth.user?.email
  const labId = 5 // lab_id 고정(문제 번호에 맞게)

  // 정답 비교 (예시: '1234'가 정답)
  const correct = userAnswer.value.trim() === 'FLAG{c40aa085bd4ec6e1cbbce847f8d60304}'
  const status = correct ? 'completed' : 'in-progress'

  try {
    const res = await api.post('/labs/labs/submit', {
      email: email,
      lab_id: labId,
      is_correct: correct,
      status: status,
    })
    console.log('서버 응답:', res.data)

    successMessage.value = '성공! 문제를 해결하셨습니다.'
    failMessage.value = '실패! 다시 시도해 보세요.'
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
  const lab_id = 5
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    // 문제 id 고정(5)
    await api.post('/labs/labs/environment', { email: email, lab_id: lab_id })
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
    window.open(`http://${frontendHost}:${frontendPort.value}`, '_blank')
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
