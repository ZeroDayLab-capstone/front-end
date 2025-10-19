<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row justify-center">
      <div class="col-12 col-md-7">
        <q-card flat>
          <div class="centered-container">
            <h2 class="text-h4 text-weight-bold q-mb-md">{{ currentSection.title }}</h2>
            <component :is="currentSection.component" />
            <div class="bottom-right-buttons">
              <q-btn
                v-if="index > 0"
                label="이전"
                class="q-mr-sm"
                color="black"
                @click="go(index - 1)"
              />
              <q-btn
                v-if="index < sections.length - 1"
                label="다음"
                color="black"
                @click="go(index + 1)"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { filevulnSections as sections } from '@/data/ssrf/sections'
import { useSectionRouter } from '@/composables/useSectionRouter'
const { index, go } = useSectionRouter(sections.length)
const currentSection = computed(() => sections[index.value])
</script>

<style scoped>
.centered-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}
.bottom-right-buttons {
  position: fixed;
  bottom: 80px;
  right: 32px;
  display: flex;
}
.q-mr-sm {
  margin-right: 8px;
}
</style>
