export const baseURL = 'http://localhost:3000'

export function arrayToObjectByID(data) {
  let massaged = {}
  data.forEach(list => {
    const { id, ...rest } = list
    massaged[id] = list
  })
  return massaged
}

export function setOptions(state, method, data) {
  const params = data ? JSON.stringify(data) : {}
  const token = state.auth.token
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
}