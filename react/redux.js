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

const initialState1 = {
  count: 0
}

const initialState2 = {
  num: 0
}

const reducer1 = (state = initialState1, action) => {
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


const reducer2 = (state = initialState2, action) => {
  switch (action.type) {
    case "ADD":
      return {
        count: state.num + 1
      }
    case "REDUCE":
      return {
        count: state.num - 1
      }
    default:
      return {
        ...state
      }
  }
}

const action1 = {
  add: {
    type: "ADD"
  },
  reduce: {
    type: "REDUCE"
  }
}

const action2 = {
  add: {
    type: "ADD"
  },
  reduce: {
    type: "REDUCE"
  }
}

const compose = (...fn) => {
  if (fn.length === 0) {
    return fn[0]
  }
  return fn.reduce((a, b) => (...args) => a(b(...args)))
}

const reducer = compose(reducer1, reducer2)

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(action1.add)
store.dispatch(action1.add)