import { ref, computed, watch } from 'vue'

export function useQuiz(currentSectionGetter) {
  const show = ref(false)
  const quizIdx = ref(0)
  const selected = ref(null)
  const isCorrect = ref(false)
  const feedback = ref('')
  const tries = ref(0)
  const answeredShown = ref(false)
  const perQuizCorrect = ref([])

  const hasQuizzes = computed(() => {
    const s = currentSectionGetter?.()
    return Array.isArray(s?.quizzes) && s.quizzes.length > 0
  })
  const totalQuizzes = computed(() =>
    hasQuizzes.value ? currentSectionGetter().quizzes.length : 0,
  )
  const quiz = computed(() =>
    hasQuizzes.value ? currentSectionGetter().quizzes[quizIdx.value] : null,
  )

  watch([show, totalQuizzes], () => {
    if (show.value && totalQuizzes.value > 0) {
      perQuizCorrect.value = Array.from({ length: totalQuizzes.value }, () => false)
    }
  })

  watch(selected, () => {
    isCorrect.value = false
    feedback.value = ''
    answeredShown.value = false
    tries.value = 0
  })

  const progress = computed(() => {
    if (!hasQuizzes.value) return 0
    const solved = perQuizCorrect.value.filter(Boolean).length
    return solved / totalQuizzes.value
  })

  function reset() {
    quizIdx.value = 0
    selected.value = null
    isCorrect.value = false
    feedback.value = ''
    tries.value = 0
    answeredShown.value = false
  }

  function openIfNeeded(sectionPassed) {
    if (hasQuizzes.value && !sectionPassed) {
      reset()
      show.value = true
      return true
    }
    return false
  }

  function check() {
    if (!quiz.value || selected.value == null) return
    tries.value++
    const ok = selected.value === quiz.value.answer
    isCorrect.value = ok
    perQuizCorrect.value[quizIdx.value] = ok
    answeredShown.value = true
    if (!ok && tries.value >= 2 && quiz.value.hint) feedback.value = `힌트: ${quiz.value.hint}`
  }

  function next() {
    if (!isCorrect.value) return
    if (quizIdx.value < totalQuizzes.value - 1) {
      quizIdx.value++
      selected.value = null
      isCorrect.value = false
      feedback.value = ''
      tries.value = 0
      answeredShown.value = false
    }
  }

  function prev() {
    if (quizIdx.value === 0) return
    quizIdx.value--
    selected.value = null
    isCorrect.value = !!perQuizCorrect.value[quizIdx.value]
    feedback.value = ''
    tries.value = 0
    answeredShown.value = false
  }

  // 옵션 클래스 (요즘 UI)
  function optionClass(val) {
    if (!answeredShown.value) return 'opt-default'
    const ans = quiz.value?.answer
    if (isCorrect.value) return val === ans ? 'opt-correct' : 'opt-dim'
    if (val === selected.value) return 'opt-wrong'
    return 'opt-default'
  }

  return {
    show,
    quizIdx,
    selected,
    isCorrect,
    feedback,
    tries,
    answeredShown,
    perQuizCorrect,
    hasQuizzes,
    totalQuizzes,
    quiz,
    progress,
    reset,
    openIfNeeded,
    check,
    next,
    prev,
    optionClass,
  }
}
