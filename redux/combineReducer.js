const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers)
  return (state = {}, action) => {
    const nextState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = redcuerKeys[i]
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}