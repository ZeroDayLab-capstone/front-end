<template>
  <q-page class="q-pa-md" style="max-width: 600px">
    <div class="text-h6 q-mb-lg">새 실습 문제 등록</div>

    <q-form @submit.prevent="onSubmit">
      <q-input v-model="form.title" label="제목" class="q-mb-md" />
      <q-input v-model="form.description" type="textarea" label="설명" rows="4" class="q-mb-md" />
      <q-select
        v-model="form.difficulty"
        :options="['easy', 'medium', 'hard']"
        label="난이도"
        class="q-mb-lg"
      />

      <div class="text-right">
        <q-btn label="등록" color="primary" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  description: '',
  difficulty: '',
})

function onSubmit() {
  // TODO: api.post('/admin/labs', form)
  console.log('실습 등록 payload:', JSON.parse(JSON.stringify(form)))
}
</script>
