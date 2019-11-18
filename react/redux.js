const createStore = (reducer) => {
  const store = {}
  store.state = reducer(undefined, {})
  store.listener = []

  store.subscribe = listener => {
    store.listener.push(listener)
  }

  store.dispatch = action => {
    store.state = reducer(store.state, action)
    store.listener.forEach(listener => listener())
  }

  store.getState = () => store.state

  return store
}

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        count: state.count + 1
      }
    case "REDUCE":
      return {
        count: state.count - 1
      }
    default:
      return {
        ...state
      }
  }
}


const action = {
  add: {
    type: "ADD"
  },
  reduce: {
    type: "REDUCE"
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(action.add)
store.dispatch(action.add)
