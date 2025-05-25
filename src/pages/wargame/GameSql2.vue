<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row justify-center">
      <!-- 왼쪽: 문제 설명 카드 -->
      <div class="col-12 col-md-7">
        <q-card flat class="bg-grey-1 text-dark q-px-sm q-pb-sm">
          <!-- 헤더 (문제 제목, 난이도, etc.) -->
          <q-card-section>
            <div class="text-h5">{{ problemTitle }}</div>
            <div class="text-caption text-grey">사용 대상: 학습자</div>
            <!-- 난이도 뱃지 -->
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
                <li>Blind SQL Injection (Time-based)** 기법을 이해하고 실습합니다.</li>
                <li>
                  에러 메시지 없이 <strong>응답 지연</strong>만으로 내부 정보를
                  <strong>한 글자</strong>씩 추출하는 방법을 학습합니다.
                </li>
                <li>
                  <strong>SQLite 환</strong>경에서도 <span style="color: red">SLEEP()</span> 함수가
                  없는 상황을 우회하여 <span style="color: red">time.sleep()</span> 을 유도하는
                  로직을 활용해 Blind SQLi 문제를 구성하고 공격합니다.
                </li>
              </ul>
            </div>

            <div class="q-my-sm text-h6">2️⃣문제 시나리오🎭</div>
            <div class="text-h6 q-pl-md">
              <div>
                💡당신은 한 커뮤니티 사이트의 VIP 회원 명단을 조사 중입니다.
                <div class="q-pa-sm">
                  이 사이트는 로그인 없이 <span style="color: red">id</span> 파라미터만으로 넥네임을
                  조회할 수 있으나, <br />플래그는 별도 테이블에 숨겨져 있습니다.
                </div>
              </div>
              <div>
                <q-card flat bordered class="code-block">
                  <pre><code>  GET /?id=3
  → 사용자 정보: bob</code></pre>
                </q-card>
              </div>

              사용자 정보는 넥네임만 반환하며, 빈 결과 시 "사용자 정보가 없습니다." 만 표시 됩니다.
              <br />플래그는 <span style="color: red">flags</span> 테이블에 있으며, 직접
              노출(UNION등) 이 불가합니다.

              <div>Blind 방식으로 flag 값을 획득하세요.</div>
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
              <div class="text-h6">
                <q-card flat bordered class="code-block">
                  <pre><code>  ?id=4' AND (
    CASE
      WHEN ascii(substr((SELECT flag FROM flags), P, 1)) = X
      THEN sleep(1)
      ELSE 0
    END
  )-- </code></pre>
                </q-card>
                <ul>
                  <li><span style="color: red">P</span>: 플래그 문자 위치 (1부터 시작)</li>
                  <li><span style="color: red">X</span>: 테스트할 ASCII 값</li>
                  <li>1초 지연을 기준으로 응답 지연 여부를 확인</li>
                </ul>
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
                :to="{ name: 'WargameExplanationSqlInjection2' }"
              ></q-btn>
            </div>
            <div v-if="submitResult" class="q-mt-sm">
              <q-banner
                v-if="submitSuccess"
                type="positive"
                icon="check_circle"
                label="성공! 문제를 해결하셨습니다."
              />
              <q-banner v-else type="negative" icon="warning" label="실패! 다시 시도해 보세요." />
            </div>
          </q-card-section>
          <q-separator spaced />
          <!-- 오른쪽: 추가 액션 (서버 생성 버튼 등) -->
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
//import { QCard, QInput, QBtn, QBadge, QBanner, QExpansionItem } from 'quasar'

// 예시: 문제 정보
const problemTitle = ref('VIP 닉네임을 훔쳐라')
const difficulty = ref('hard') // 예: 'easy' / 'medium' / 'hard'

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

// 정답 제출
const userAnswer = ref('')
const submitResult = ref(false)
const submitSuccess = ref(false)

function onSubmitAnswer() {
  // 실제 정답 체크 로직...
  if (userAnswer.value.trim() === '1234') {
    submitSuccess.value = true
  } else {
    submitSuccess.value = false
  }
  submitResult.value = true
}

// 서버 생성
const serverCreated = ref(false)
function onCreateServer() {
  // 서버 생성 API 호출 등...
  serverCreated.value = true
}

// 실습 시작
function onStartPractice() {
  // 해당 실습 페이지(혹은 서버 URL)로 이동 처리
  console.log('실습 시작!')
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

.code-block {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}
</style>
