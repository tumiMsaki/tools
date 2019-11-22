const createStore = (reducer, initialState) => {
  const store = {}
  store.state = initialState
  store.listener = []

  store.subscribe = listener => {
    store.listener.push(listener)
  }

  store.dispatch = action => {
    store.state = reducer(store.state, action)
    store.listener.forEach(listener => listener())
  }

  store.getState = () => store.state

  store.dispatch({ type: Symbol() })
  return store
}

