const createStore = (reducer, initialState) => {
  const store = {}
  store.state = initialState
  store.listener = []

  store.subscribe = listener => {
    store.listener.push(listener)
    return unsubscribe = () => {
      const index = store.listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  store.dispatch = action => {
    store.state = reducer(store.state, action)
    store.listener.forEach(listener => listener())
  }

  store.getState = () => store.state

  store.dispatch({ type: Symbol() })
  return store
}

