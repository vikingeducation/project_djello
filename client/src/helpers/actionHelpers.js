export const baseURL = 'http://localhost:3000'

export function arrayToObjectByID(data) {
  let massaged = {}
  data.forEach(list => {
    const { id, ...rest } = list
    massaged[id] = rest
  })
  return massaged
}