import { http } from './http'

export function fetchProgress(moduleKey) {
  return http.get(`/progress/${moduleKey}`)
}
export function saveProgress(moduleKey, payload) {
  return http.put(`/progress/${moduleKey}`, payload)
}
