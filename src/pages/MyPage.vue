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
            <q-input v-model="editData.id" label="ID" filled readonly />
            <q-input v-model="editData.gender" label="성별" filled class="q-mt-sm" />
            <q-input v-model="editData.nationality" label="국적" filled class="q-mt-sm" />
            <q-input v-model="editData.email" label="Email" filled class="q-mt-sm" />
          </div>
        </q-card-section>
      </q-card>

      <!-- 수강 중인 과목 카드 (기존 그대로) -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">수강 중인 과목</div>
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
                  <div class="text-caption text-grey-7 q-mt-xs">수강률: {{ course.progress }}%</div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

export default {
  name: 'MyPage',
  setup() {
    const router = useRouter()

    // TODO: 실제 사용자 ID 로 대체하세요
    const userId = 2

    // 1) 서버에서 받아 올 내 정보
    const userInfo = ref({
      id: '',
      username: '',
      gender: '',
      nationality: '',
      email: '',
    })

    // 편집 모드 / 임시 데이터
    const editMode = ref(false)
    const editData = ref({ ...userInfo.value })

    // 저장 중 로딩 표시
    const saving = ref(false)

    // 2) 수강 중인 과목 (기존)
    const courses = ref([
      { id: 1, name: 'Web Basic', progress: 30 },
      { id: 2, name: 'SQL injection', progress: 34 },
      { id: 3, name: 'XSS', progress: 37 },
      { id: 4, name: 'CSRF', progress: 0 },
    ])

    // 페이지 로드 시 내 정보 GET
    async function fetchProfile() {
      try {
        const res = await api.get(`/mypage/mypage/profile/${userId}`)
        // { username, email, gender, nationality, job } 형태 리턴 가정
        userInfo.value = {
          id: res.data.username, // 만약 id가 따로 있으면 그걸 쓰세요
          username: res.data.username,
          gender: res.data.gender,
          nationality: res.data.nationality,
          email: res.data.email,
        }
      } catch (err) {
        console.error('프로필 조회 실패', err)
      }
    }
    onMounted(fetchProfile)

    // 편집 시작
    function startEdit() {
      editData.value = { ...userInfo.value }
      editMode.value = true
    }
    function cancelEdit() {
      editMode.value = false
    }

    // 편집 저장 (PUT or PATCH)
    async function saveEdit() {
      saving.value = true
      try {
        await api.put(`/mypage/mypage/profile/${userId}`, {
          username: editData.value.username,
          gender: editData.value.gender,
          nationality: editData.value.nationality,
          email: editData.value.email,
        })
        // 반영
        userInfo.value = { ...editData.value }
        editMode.value = false
      } catch (err) {
        console.error('프로필 저장 실패', err)
      } finally {
        saving.value = false
      }
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
