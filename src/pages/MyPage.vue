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
        <div class="text-h5">Zman</div>
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
                <q-btn flat color="positive" label="저장하기" class="q-ml-sm" @click="saveEdit" />
              </div>
            </div>
          </div>

          <!-- 내 정보 내용 -->
          <!-- 편집 모드가 아닐 때: 일반 텍스트로 표시 -->
          <div class="q-mt-sm" v-if="!editMode">
            <div>ID: {{ userInfo.id }}</div>
            <div>성별: {{ userInfo.gender }}</div>
            <div>국적: {{ userInfo.nationality }}</div>
            <div>Email: {{ userInfo.email }}</div>
          </div>

          <!-- 편집 모드일 때: QInput 폼으로 표시 -->
          <div class="q-mt-sm" v-else>
            <q-input v-model="editData.id" label="ID" filled />
            <q-input v-model="editData.gender" label="성별" filled class="q-mt-sm" />
            <q-input v-model="editData.nationality" label="국적" filled class="q-mt-sm" />
            <q-input v-model="editData.email" label="Email" filled class="q-mt-sm" />
          </div>
        </q-card-section>
      </q-card>

      <!-- 수강 중인 과목 카드 -->
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MyPage',
  setup() {
    const router = useRouter()

    // 1) 내 정보(더미 데이터)
    const userInfo = ref({
      id: 'Zman123',
      gender: '남성',
      nationality: '한국',
      email: 'example@example.com',
    })

    // 편집 모드 상태
    const editMode = ref(false)

    // 편집용 임시 데이터
    const editData = ref({ ...userInfo.value })

    // 편집 시작
    function startEdit() {
      // userInfo 내용을 editData에 복사
      editData.value = { ...userInfo.value }
      editMode.value = true
    }

    // 편집 취소
    function cancelEdit() {
      // editData를 버리고 편집 모드 해제
      editMode.value = false
    }

    // 편집 저장
    function saveEdit() {
      // editData의 내용을 userInfo에 반영
      userInfo.value = { ...editData.value }
      editMode.value = false
      // TODO: 서버에 저장 로직이 있다면 이곳에서 처리
    }

    // 2) 수강 중인 과목
    const courses = ref([
      { id: 1, name: 'Web Basic', progress: 30 },
      { id: 2, name: 'SQL injection', progress: 34 },
      { id: 3, name: 'XSS', progress: 37 },
      { id: 4, name: 'CSRF', progress: 0 },
    ])

    // 과목 카드 클릭 시 해당 학습 페이지로 이동
    function goToCourse(courseId) {
      // 예: /course/1 이런 식으로 라우팅
      router.push(`/course/${courseId}`)
    }

    return {
      userInfo,
      editMode,
      editData,
      startEdit,
      cancelEdit,
      saveEdit,
      courses,
      goToCourse,
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
