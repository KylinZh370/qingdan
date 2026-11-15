export function normalizeTasks(value) {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    return Array.isArray(parsed) ? parsed.filter((task) => task && typeof task.title === 'string') : []
  } catch { return [] }
}

export function normalizeLists(value) {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    return Array.isArray(parsed) ? [...new Set(parsed.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean))] : []
  } catch { return [] }
}

export function tasksForDate(tasks, date) {
  return tasks.filter((task) => task.date === date).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'))
}

export function nextDateForWeekdays(date, weekdays) {
  if (!date || !weekdays?.length) return date
  const current = new Date(`${date}T00:00:00`)
  const allowed = new Set(weekdays.map(Number))
  for (let offset = 0; offset < 7; offset++) {
    const candidate = new Date(current)
    candidate.setDate(current.getDate() + offset)
    if (allowed.has(candidate.getDay())) return `${candidate.getFullYear()}-${String(candidate.getMonth() + 1).padStart(2, '0')}-${String(candidate.getDate()).padStart(2, '0')}`
  }
  return date
}

export function sortTasksBySchedule(tasks) {
  return [...tasks].sort((a, b) => {
    const dateOrder = (a.date || '9999-12-31').localeCompare(b.date || '9999-12-31')
    if (dateOrder) return dateOrder
    const timeOrder = (a.time || '99:99').localeCompare(b.time || '99:99')
    if (timeOrder) return timeOrder
    return String(a.title || '').localeCompare(String(b.title || ''), 'zh-CN')
  })
}

