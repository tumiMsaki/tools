class BinarySearchTree {
  constructor(tree) {
    this.root = null
    this.Node = key => {
      let _obj = Object.create(null, {})
      _obj.key = key
      _obj.right = null
      _obj.left = null
      return _obj
    }

    if (typeof tree === "number") {
      this.insert(tree)
    } else if (Array.isArray(tree)) {
      this.BulkInsert(tree)
    } else {
      console.log("please input an number or array")
    }
  }

  insert(key) {
    let newNode = this.Node(key)

    let _insert = (node, newNode) => {
      if (newNode.key > node.key) {
        if (node.right === null) {
          node.right = newNode
        } else {
          _insert(node.right, newNode)
        }
      } else {
        if (newNode.key < node.key) {
          if (node.left === null) {
            node.left = newNode
          } else {
            _insert(node.left, newNode)
          }
        }
      }
    }

    if (this.root === null) {
      this.root = newNode
    } else {
      _insert(this.root, newNode)
    }
  }

  BulkInsert(arr) {
    arr.forEach(item => {
      this.insert(item)
    })
  }

  showTree() {
    return this.root
  }

  inOrderTraverse(fn) {
    let inOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback)
        callback(node.key)
        inOrderTraverseNode(node.right, callback)
      }
    }

    inOrderTraverseNode(this.root, fn)
  }

  preOrderTraverse(fn) {
    let preOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        callback(node.key)
        preOrderTraverseNode(node.left, callback)
        preOrderTraverseNode(node.right, callback)
      }
    }
    preOrderTraverseNode(this.root, fn)
  }

  postOrderTraverse(fn) {
    let postOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback)
        postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }
    this.postOrderTraverseNode(this.root, fn)
  }

  min() {
    let node = this.root
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
  }

  max() {
    let node = this.root
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
  }

  search(key) {
    let searchNode = (node, key) => {
      if (node === null) {
        return false
      }
      if (key < node.key) {
        return searchNode(node.left, key)
      } else if (key > node.key) {
        return searchNode(node.right, key)
      } else {
        return true
      }
    }
    return searchNode(this.root, key)
  }
}
