<template>
  <q-page class="bg-grey-1 q-pa-xl flex flex-center">
    <div class="my-page-container">
      <div class="text-h4 q-mb-lg text-center">My Page</div>

      <div class="row q-gutter-md q-mb-lg items-center justify-center">
        <div class="col-auto">
          <q-avatar size="100px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
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
            <div>ID: {{ userInfo.id }}</div>
            <div>성별: {{ userInfo.gender }}</div>
            <div>국적: {{ userInfo.nationality }}</div>
            <div>Email: {{ userInfo.email }}</div>
          </div>

          <!-- 편집 모드 -->
          <div class="q-mt-sm" v-else>
            <q-input v-model="editData.id" label="ID" filled />
            <q-input v-model="editData.gender" label="성별" filled class="q-mt-sm" />
            <q-input v-model="editData.nationality" label="국적" filled class="q-mt-sm" />
            <q-input v-model="editData.email" label="Email" filled class="q-mt-sm" />
            <q-input
              v-model="editData.password"
              label="Password"
              type="password"
              filled
              class="q-mt-sm"
            />
            <q-input v-model="editData.job" label="직업" filled class="q-mt-sm" />
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
import jwtDecode from 'jwt-decode'
import { useAuthStore } from 'src/stores/auth'

export default {
  name: 'MyPage',
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const userId = computed(() => {
      if (!auth.token) return null
      const decoded = jwtDecode(auth.token)
      console.log('Decoded user ID:', decoded)
      return decoded.sub || null
    })

    // 1) 서버에서 받아 올 내 정보
    const userInfo = ref({
      id: '',
      username: '',
      gender: '',
      nationality: '',
      email: '',
      password: '',
      job: '',
    })

    // 편집 모드 / 임시 데이터
    const editMode = ref(false)
    const editData = ref({ ...userInfo.value })

    // 저장 중 로딩 표시
    const saving = ref(false)

    // 2) 수강 중인 과목 (기존)
    const courses = ref([])

    // 완료된 실습 목록 상태
    const completedLabs = ref([])

    // 페이지 로드 시 내 정보 GET
    async function fetchProfile() {
      if (!userId.value) {
        console.error('userId가 null입니다. 프로필을 불러올 수 없습니다.')
        return
      }

      try {
        const res = await api.get(`/mypage/mypage/profile/${userId.value}`)
        userInfo.value = {
          id: res.data.username, // 서버에서 받은 데이터로 채움
          username: res.data.username,
          gender: res.data.gender,
          nationality: res.data.nationality,
          email: res.data.email,
          password: '',
          job: res.data.job,
        }
        editData.value = { ...userInfo.value }
      } catch (err) {
        console.error('프로필 조회 실패', err)
      }
    }

    // 프로필 정보 수정
    async function saveEdit() {
      saving.value = true
      try {
        // 비밀번호가 있을 때만 포함하는 payload
        const payload = {
          username: editData.value.username,
          email: editData.value.email,
          gender: editData.value.gender,
          nationality: editData.value.nationality,
          job: editData.value.job,
        }
        if (editData.value.password) {
          payload.password = editData.value.password
        }
        const res = await api.put(`/mypage/mypage/profile/${userId.value}`, payload)

        // 2) 저장 후 프로필 다시 조회
        await fetchProfile()

        // 성공 메시지 보여주기 (optional)
        console.log(res.data.message)
        // UI 반영
        userInfo.value = { ...editData.value }
        editMode.value = false
      } catch (err) {
        console.error('프로필 저장 실패', err)
      } finally {
        saving.value = false
      }
    }

    // 진행 중인 실습 목록 조회
    async function fetchOngoingLabs() {
      if (!userId.value) return
      try {
        const res = await api.get(`/mypage/mypage/ongoing-labs/${userId.value}`)
        // { additionalProp1: [...], additionalProp2: [...], … }
        const lists = Object.values(res.data).flat()
        // 예시: lab_id 만 있으므로 name/ progress 기본값 설정
        courses.value = lists.map((item) => ({
          id: item.lab_id,
          name: `실습 ${item.lab_id}`,
          progress: 0,
        }))
      } catch (err) {
        console.error('진행 중인 실습 조회 실패', err)
      }
    }

    async function fetchCompletedLabs() {
      if (!userId.value) return
      try {
        const res = await api.get(`/mypage/mypage/completed-labs/${userId.value}`)
        const lists = Object.values(res.data).flat()
        completedLabs.value = lists.map((item) => ({
          id: item.lab_id,
          name: `실습 ${item.lab_id}`,
        }))
      } catch (err) {
        console.error('완료된 실습 조회 실패', err)
      }
    }

    onMounted(async () => {
      await fetchProfile()
      await fetchOngoingLabs()
      await fetchCompletedLabs()
    })

    // 편집 시작
    function startEdit() {
      editData.value = { ...userInfo.value }
      editMode.value = true
    }
    function cancelEdit() {
      editMode.value = false
    }

    // 과목 클릭
    function goToCourse(courseId) {
      router.push(`/course/${courseId}`)
    }

    return {
      userInfo,
      editMode,
      editData,
      courses,
      completedLabs,
      startEdit,
      cancelEdit,
      saveEdit,
      goToCourse,
      saving,
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
