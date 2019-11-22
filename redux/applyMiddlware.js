function applyMiddlware(...middlware) {
  return function rewriteCreateStore(oldCreateStore) {
    return function newCreateStore(reducer, initState) {
      const store = oldCreateStore(reducer, initState)
      const chain = middlware.map(middlware => middlware(store))
      dispatch = compose(...chain)(store.dispatch)
      store.dispatch = dispatch
      return store
    }
  }
}