import { ref } from 'vue'
import { fetchProgress, saveProgress } from 'src/services/progressApi'

export function useProgress(moduleKey, sectionCount) {
  const sectionPassed = ref(Array.from({ length: sectionCount }, () => false))
  const perSection = ref({})

  async function load() {
    try {
      const { data } = await fetchProgress(moduleKey)
      const saved = data?.progress || {}
      const savedPassed = Array.isArray(saved.sectionPassed) ? saved.sectionPassed : []
      const fixed = Array.from({ length: sectionCount }, (_, i) => !!savedPassed[i])
      sectionPassed.value = fixed
      perSection.value = saved.perSection || {}
    } catch {
      const cached = JSON.parse(localStorage.getItem(`progress:${moduleKey}`) || '{}')
      if (cached.sectionPassed) {
        const fixed = Array.from({ length: sectionCount }, (_, i) => !!cached.sectionPassed[i])
        sectionPassed.value = fixed
        perSection.value = cached.perSection || {}
      }
    }
  }

  let timer = null
  function saveDebounced() {
    clearTimeout(timer)
    timer = setTimeout(save, 400)
  }

  async function save() {
    const payload = { sectionPassed: sectionPassed.value, perSection: perSection.value }
    localStorage.setItem(`progress:${moduleKey}`, JSON.stringify(payload))
    try {
      await saveProgress(moduleKey, payload)
    } catch (e) {
      console.debug('saveProgress skipped:', e?.message || e)
    }
  }

  return { sectionPassed, perSection, load, saveDebounced }
}
