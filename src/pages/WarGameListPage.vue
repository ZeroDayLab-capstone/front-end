<template>
  <q-page class="bg-grey-2 q-pa-lg q-pb-xl">
    <div class="page-container">
      <!-- 상단 헤더 + 난이도 필터 -->
      <div class="row items-center justify-between q-mb-lg">
        <div>
          <div class="text-overline text-grey-7">War Game Challenges</div>
          <div class="text-h4 text-weight-bold q-mt-xs">웹 취약점 워게임</div>
          <div class="text-caption text-grey-7 q-mt-xs">
            난이도(초급 · 중급 · 고급)에 맞춰 문제를 선택하고, 실제 공격·방어 과정을 경험해 보세요.
          </div>
        </div>

        <q-btn-toggle
          v-model="levelFilter"
          dense
          unelevated
          rounded
          color="grey-3"
          text-color="black"
          toggle-color="black"
          toggle-text-color="white"
          :options="levelOptions"
        />
      </div>

      <q-card flat class="main-card q-pa-lg">
        <!-- CSRF 카테고리 -->
        <div class="section-card">
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <div class="text-h4 text-weight-bold">CSRF</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                사용자를 가장해 악의적인 요청을 보내는 크로스 사이트 요청 위조 취약점 실습
                문제입니다.
              </div>
            </div>
          </div>

          <div class="row q-gutter-md justify-start">
            <div v-for="vuln in filteredCsrfVulns" :key="vuln.id" class="problem-card-wrapper">
              <q-card
                flat
                bordered
                class="problem-card cursor-pointer"
                @click="solveProblem(vuln.id)"
              >
                <q-img :src="vuln.image" fit="contain" :ratio="4 / 3" class="problem-img"> </q-img>

                <q-card-section class="q-pa-sm">
                  <div class="text-subtitle2 text-weight-bold">
                    {{ vuln.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <!-- SQL Injection 카테고리 -->
        <div class="section-card q-mt-xl">
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <div class="text-h4 text-weight-bold">SQL Injection</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                쿼리 조작을 통해 로그인 우회, 데이터 조회·변조 등을 수행하는 인젝션 공격 문제입니다.
              </div>
            </div>
          </div>

          <div class="row q-gutter-md justify-start">
            <div
              v-for="vuln in filteredSqlInjectionVulns"
              :key="vuln.id"
              class="problem-card-wrapper"
            >
              <q-card
                flat
                bordered
                class="problem-card cursor-pointer"
                @click="solveProblem(vuln.id)"
              >
                <q-img :src="vuln.image" fit="contain" :ratio="4 / 3" class="problem-img"> </q-img>

                <q-card-section class="q-pa-sm">
                  <div class="text-subtitle2 text-weight-bold">
                    {{ vuln.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Command Injection 카테고리 -->
        <div class="section-card q-mt-xl">
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <div class="text-h4 text-weight-bold">Command Injection</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                서버에서 OS 명령어가 실행되도록 만드는 고위험 명령어 주입 취약점 문제입니다.
              </div>
            </div>
          </div>

          <div class="row q-gutter-md justify-start">
            <div
              v-for="vuln in filteredCommandInjectionVulns"
              :key="vuln.id"
              class="problem-card-wrapper"
            >
              <q-card
                flat
                bordered
                class="problem-card cursor-pointer"
                @click="solveProblem(vuln.id)"
              >
                <q-img :src="vuln.image" fit="contain" :ratio="4 / 3" class="problem-img"> </q-img>

                <q-card-section class="q-pa-sm">
                  <div class="text-subtitle2 text-weight-bold">
                    {{ vuln.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <!-- XSS 카테고리 -->
        <div class="section-card q-mt-xl">
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <div class="text-h4 text-weight-bold">XSS</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                스크립트 삽입을 통해 쿠키·세션 탈취 및 UI 변조를 수행하는 크로스 사이트 스크립팅
                문제입니다.
              </div>
            </div>
          </div>

          <div class="row q-gutter-md justify-start">
            <div v-for="vuln in filteredXssVulns" :key="vuln.id" class="problem-card-wrapper">
              <q-card
                flat
                bordered
                class="problem-card cursor-pointer"
                @click="solveProblem(vuln.id)"
              >
                <q-img :src="vuln.image" fit="contain" :ratio="4 / 3" class="problem-img"> </q-img>

                <q-card-section class="q-pa-sm">
                  <div class="text-subtitle2 text-weight-bold">
                    {{ vuln.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <!-- File Vulnerability 카테고리 -->
        <div class="section-card q-mt-xl">
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <div class="text-h4 text-weight-bold">File Vulnerability</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                파일 업로드·다운로드 및 경로 조작을 통해 웹셸 업로드, 정보 유출 등을 유도하는
                문제입니다.
              </div>
            </div>
          </div>

          <div class="row q-gutter-md justify-start">
            <div v-for="vuln in filteredOtherVulns" :key="vuln.id" class="problem-card-wrapper">
              <q-card
                flat
                bordered
                class="problem-card cursor-pointer"
                @click="solveProblem(vuln.id)"
              >
                <q-img :src="vuln.image" fit="contain" :ratio="4 / 3" class="problem-img"> </q-img>

                <q-card-section class="q-pa-sm">
                  <div class="text-subtitle2 text-weight-bold">
                    {{ vuln.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import csrf from 'src/assets/problem_csrf.png'
import sql1 from 'src/assets/problem_sql_1.png'
import sql2 from 'src/assets/problem_sql_2.png'
import sql3 from 'src/assets/problem_sql_3.png'
import xss1 from 'src/assets/problem_xss_stored_1.png'
import xss2 from 'src/assets/problem_xss_stored_2.png'
import xss3 from 'src/assets/problem_xss_stored_3.png'
import xss4 from 'src/assets/problem_xss_reflected.png'
import filevuln from 'src/assets/problem_file_vuln.png'
import command from 'src/assets/problem_command.png'
import path from 'src/assets/problem_path_traversal.png'

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const router = useRouter()

    // 난이도 필터 상태
    const levelFilter = ref('all') // 'all' | 'beginner' | 'intermediate' | 'advanced'
    const levelOptions = [
      { label: '전체', value: 'all' },
      { label: '초급', value: 'beginner' },
      { label: '중급', value: 'intermediate' },
      { label: '고급', value: 'advanced' },
    ]
    const levelLabelMap = {
      beginner: '초급',
      intermediate: '중급',
      advanced: '고급',
    }

    // === 문제 리스트 (+ 난이도 정보 추가) ===
    const csrfVulns = ref([
      { id: 'csrf', name: '관리자 권한 탈취 작전', image: csrf, level: 'intermediate' },
    ])

    const sqlInjectionVulns = ref([
      { id: 'sql-injection1', name: '비밀번호 없이 관리자 로그인', image: sql1, level: 'beginner' },
      { id: 'sql-injection2', name: 'BookStore: UNION Injection', image: sql3, level: 'advanced' },
      { id: 'sql-injection3', name: 'VIP 닉네임을 훔쳐라', image: sql2, level: 'intermediate' },
    ])

    const commandInjectionVulns = ref([
      {
        id: 'command-injection',
        name: '명령어 주입으로 플래그 탈취',
        image: command,
        level: 'advanced',
      },
    ])

    const xssVulns = ref([
      { id: 'xss-stored1', name: '악성 게시글로 경고창 띄우기', image: xss1, level: 'beginner' },
      {
        id: 'xss-stored2',
        name: '우회 페이로드를 통한 FLAG 획득',
        image: xss2,
        level: 'intermediate',
      },
      {
        id: 'xss-stored3',
        name: '관리자 세션 탈취 및 관리자 전용 게시글 열람을 통한 FLAG 획득',
        image: xss3,
        level: 'advanced',
      },
      {
        id: 'xss-reflected',
        name: '검색어 기반 XSS 실행을 통한 FLAG 획득',
        image: xss4,
        level: 'intermediate',
      },
    ])

    const otherVulns = ref([
      {
        id: 'file-vulnerability2',
        name: '경로 조작 스크립트를 통한 FLAG 획득',
        image: path,
        level: 'beginner',
      },
      {
        id: 'file-vulnerability',
        name: '악성 PHP 스크립트를 통한 FLAG 획득',
        image: filevuln,
        level: 'advanced',
      },
    ])

    // 공통 필터 함수
    const filterByLevel = (listRef) =>
      computed(() => {
        if (levelFilter.value === 'all') return listRef.value
        return listRef.value.filter((v) => v.level === levelFilter.value)
      })

    const filteredCsrfVulns = filterByLevel(csrfVulns)
    const filteredSqlInjectionVulns = filterByLevel(sqlInjectionVulns)
    const filteredCommandInjectionVulns = filterByLevel(commandInjectionVulns)
    const filteredXssVulns = filterByLevel(xssVulns)
    const filteredOtherVulns = filterByLevel(otherVulns)

    function solveProblem(id) {
      if (id === 'csrf') router.push('/gamecsrf')
      else if (id === 'sql-injection1') router.push('/gamesqlinjection1')
      else if (id === 'sql-injection2') router.push('/gamesqlinjection2')
      else if (id === 'sql-injection3') router.push('/gamesqlinjection3')
      else if (id === 'command-injection') router.push('/gamecommandinjection')
      else if (id === 'xss-stored1') router.push('/gamexssstored1')
      else if (id === 'xss-stored2') router.push('/gamexssstored2')
      else if (id === 'xss-stored3') router.push('/gamexssstored3')
      else if (id === 'xss-reflected') router.push('/gamexssreflected')
      else if (id === 'file-vulnerability') router.push('/gamefilevuln1')
      else if (id === 'file-vulnerability2') router.push('/gamefilevuln2')
    }

    return {
      levelFilter,
      levelOptions,
      levelLabelMap,
      filteredCsrfVulns,
      filteredSqlInjectionVulns,
      filteredCommandInjectionVulns,
      filteredXssVulns,
      filteredOtherVulns,
      solveProblem,
    }
  },
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-card {
  border-radius: 18px;
}

/* 카테고리 섹션 박스 */
.section-card {
  padding: 4px 0 4px;
}

/* 문제 카드 래퍼: 고정 폭으로 크기 통일 */
.problem-card-wrapper {
  width: 260px;
}

@media (max-width: 600px) {
  .problem-card-wrapper {
    width: 100%;
  }
}

.problem-card {
  border-radius: 16px;
  overflow: hidden;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #000000;
}

/* 이미지 영역: 전체 보이도록 contain + 연한 배경 */
.problem-img {
  background: #f5f5f5;
}

/* 난이도 칩이 잘 보이게 여백 */
.q-chip {
  font-size: 0.7rem;
}

/* 상단 헤더와 카드 간 간격 조정은 필요에 따라 추가 가능 */
</style>
