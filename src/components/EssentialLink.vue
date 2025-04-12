<template>
  <q-item clickable @click="goToPath">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  // 내부 라우팅을 위한 경로
  path: {
    type: String,
    default: '#',
  },
  icon: {
    type: String,
    default: '',
  },
})

function goToPath() {
  // 유효한 경로가 있을 때 라우터를 통해 이동
  if (props.path && props.path !== '#') {
    router.push(props.path)
  }
}
</script>
