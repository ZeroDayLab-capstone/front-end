<template>
  <q-page class="bg-grey-1 q-pa-xl flex flex-center">
    <div class="my-page-container">
      <div class="text-h4 q-mb-lg text-center">My Page</div>

      <div class="row q-gutter-md q-mb-lg items-center justify-center">
        <div class="col-auto">
          <q-avatar size="100px">
            <img :src="profileImage" />
          </q-avatar>
        </div>
      </div>
      <div class="text-center">
        <div class="text-h5">{{ userInfo.username }}</div>
      </div>

      <!-- 내 정보 카드 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-subtitle1">내 정보</div>
            <div>
              <q-btn v-if="!editMode" flat color="primary" label="편집" @click="startEdit" />
              <div v-else>
                <q-btn flat color="negative" label="취소" @click="cancelEdit" />
                <q-btn
                  flat
                  color="positive"
                  label="저장하기"
                  class="q-ml-sm"
                  @click="saveEdit"
                  :loading="saving"
                />
              </div>
            </div>
          </div>

          <!-- 읽기 모드 -->
          <div class="q-mt-sm" v-if="!editMode">
            <div>이름: {{ userInfo.username }}</div>
            <div>성별: {{ userInfo.gender }}</div>
            <div>국적: {{ userInfo.nationality }}</div>
            <div>Email: {{ userInfo.email }}</div>
          </div>

          <!-- 편집 모드 -->
          <div class="q-mt-sm" v-else>
            <q-input v-model="editData.username" label="이름" filled />
            <q-select
              v-model="editData.gender"
              label="성별"
              :options="genderOptions"
              emit-value
              map-options
              filled
              class="q-mt-sm"
            />
            <q-select
              v-model="editData.nationality"
              label="국적"
              :options="nationalityOptions"
              emit-value
              map-options
              filled
              class="q-mt-sm"
            />
            <q-input v-model="editData.email" label="Email" filled class="q-mt-sm" />
            <q-input
              v-model="editData.password"
              label="Password"
              type="password"
              filled
              class="q-mt-sm"
            />
            <q-select
              v-model="editData.job"
              label="직업"
              :options="jobOptions"
              emit-value
              map-options
              filled
              class="q-mt-sm"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- 수강 중인 과목 카드 (기존 그대로) -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">진행 중인 실습 목록</div>
          <div class="row q-gutter-md">
            <div
              v-for="course in courses"
              :key="course.id"
              class="col-12 col-sm-6 col-md-6 col-lg-4"
            >
              <q-card
                flat
                bordered
                class="q-pa-sm my-course-card"
                clickable
                @click="goToCourse(course.id)"
              >
                <q-card-section>
                  <div class="text-subtitle1">{{ course.name }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">완료된 실습 목록</div>
          <div class="row q-gutter-md">
            <div
              v-for="course in completedLabs"
              :key="course.id"
              class="col-12 col-sm-6 col-md-6 col-lg-4"
            >
              <q-card
                flat
                bordered
                class="q-pa-sm my-course-card"
                clickable
                @click="goToCourse(course.id)"
              >
                <q-card-section>
                  <div class="text-subtitle1">{{ course.name }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from 'src/stores/auth'

// === 상수/유틸 (파일 내부에만 둠) ==========================
const LAB_NAMES = {
  1: 'CSRF: 고급',
  2: 'SQL Injection: 초급',
  3: 'SQL Injection: 중급',
  4: 'SQL Injection: 고급',
  5: 'Command Injection: 중급',
  6: 'XSS Stored: 초급',
  7: 'XSS Stored: 중급',
  8: 'XSS Stored: 고급',
  9: 'XSS Reflected: 중급',
  10: 'File Vulnerability: 초급',
  11: 'File Vulnerability: 고급',
}
const LAB_ROUTE_PATHS = {
  1: 'gamecsrf',
  2: 'gamesqlinjection1',
  3: 'gamesqlinjection2',
  4: 'gamesqlinjection3',
  5: 'gamecommandinjection',
  6: 'gamexssstored1',
  7: 'gamexssstored2',
  8: 'gamexssstored3',
  9: 'gamexssreflected',
  10: 'gamefilevuln1',
  11: 'gamefilevuln2',
}
const asLabelValue = (arr) => arr.map((v) => ({ label: v, value: v }))

export default {
  name: 'MyPage',
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    // 1) JWT 안전 파싱 (토큰 없거나 깨져도 안전)
    const userEmail = computed(() => {
      const t = auth.token
      if (!t) return null
      try {
        const d = jwtDecode(t)
        return d.email || d.user_email || d.sub || null
      } catch {
        return null
      }
    })

    // 2) 셀렉트 옵션(emit-value/map-options 유지해도 안전)
    const genderOptions = asLabelValue(['남', '여'])
    const nationalityOptions = asLabelValue([
      '대한민국',
      '미국',
      '일본',
      '중국',
      '영국',
      '독일',
      '프랑스',
      '캐나다',
    ])
    const jobOptions = asLabelValue(['직장인', '프리랜서', '학생', '무직'])

    // 3) 상태들
    const userInfo = ref({
      username: '',
      gender: '',
      nationality: '',
      email: '',
      job: '',
    })
    const editMode = ref(false)
    const editData = ref({
      username: '',
      gender: '',
      nationality: '',
      email: '',
      password: '',
      job: '',
    })
    const profileImage = computed(() => {
      const g = userInfo.value.gender
      if (g === '남') return 'src/assets/img/mypage/male.png'
      if (g === '여') return 'src/assets/img/mypage/female.png'
      return 'https://cdn.quasar.dev/img/avatar.png'
    })
    const saving = ref(false)
    const loading = ref(false)
    const courses = ref([]) // 진행 중
    const completedLabs = ref([]) // 완료

    // 4) API: 단일 fetchAll로 병렬 호출
    async function fetchAll() {
      if (!userEmail.value) return
      loading.value = true
      try {
        const [p, on, done] = await Promise.all([
          api.get(`/mypage/mypage/profile/${userEmail.value}`),
          api.get(`/mypage/mypage/ongoing-labs/${userEmail.value}`),
          api.get(`/mypage/mypage/completed-labs/${userEmail.value}`),
        ])

        userInfo.value = {
          username: p.data.username,
          gender: p.data.gender,
          nationality: p.data.nationality,
          email: p.data.email,
          job: p.data.job,
        }
        // 편집 폼 초기화
        editData.value = { ...userInfo.value, password: '' }

        const toOngoing = Object.values(on.data)
          .flat()
          .map((item) => ({
            id: item.lab_id,
            name: LAB_NAMES[item.lab_id] || `실습 ${item.lab_id}`,
            progress: 0,
          }))
        const toCompleted = Object.values(done.data)
          .flat()
          .map((item) => ({
            id: item.lab_id,
            name: LAB_NAMES[item.lab_id] || `실습 ${item.lab_id}`,
          }))

        courses.value = toOngoing
        completedLabs.value = toCompleted
      } catch (err) {
        console.error('마이페이지 데이터 조회 실패', err)
      } finally {
        loading.value = false
      }
    }

    // 5) 프로필 저장 (비밀번호 키 조건부 포함)
    async function saveEdit() {
      if (!userEmail.value) return
      saving.value = true
      try {
        const basePayload = {
          username: (editData.value.username || '').trim(),
          email: (editData.value.email || '').trim(),
          gender: editData.value.gender,
          nationality: editData.value.nationality,
          job: editData.value.job,
        }
        const payload = { ...basePayload }
        if (editData.value.password && editData.value.password.trim() !== '') {
          payload.password = editData.value.password
        }

        await api.put(`/mypage/mypage/profile/${userEmail.value}`, payload)
        await fetchAll() // 서버값으로 재동기화
        editMode.value = false
      } catch (err) {
        console.error('프로필 저장 실패', err)
      } finally {
        saving.value = false
      }
    }

    // 6) 라우팅
    function goToCourse(courseId) {
      const path = LAB_ROUTE_PATHS[courseId]
      if (path) router.push(`/${path}`)
      else alert('아직 설명 페이지가 없는 문제입니다.')
    }

    // 7) 편집 모드 토글
    function startEdit() {
      editData.value = { ...userInfo.value, password: '' }
      editMode.value = true
    }
    function cancelEdit() {
      editMode.value = false
      editData.value = { ...userInfo.value, password: '' }
    }

    onMounted(async () => {
      // 토큰이 없으면 로그인으로 보내고 싶다면 아래 2줄만 (원치 않으면 제거)
      // if (!userEmail.value) return router.replace('/login')
      await fetchAll()
    })

    return {
      // state
      userInfo,
      editMode,
      editData,
      saving,
      loading,
      courses,
      completedLabs,
      // options
      genderOptions,
      nationalityOptions,
      jobOptions,
      // actions
      startEdit,
      cancelEdit,
      saveEdit,
      goToCourse,
      profileImage,
    }
  },
}
</script>

<style lang="sass" scoped>
.my-page-container
  max-width: 800px
  width: 100%
  margin: 0 auto

.my-course-card
  min-height: 80px
  display: flex
  flex-direction: column
  justify-content: center
</style>
