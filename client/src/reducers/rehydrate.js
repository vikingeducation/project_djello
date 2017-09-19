export default (state = initialState, action) {
  case "persist/REHYDRATE":
    return {
      ...state,
      persistedState: action.payload
    }
}
