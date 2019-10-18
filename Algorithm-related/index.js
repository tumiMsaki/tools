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

    if (typeof tree === 'number') {
      this.insert(tree)
    } else if (Array.isArray(tree)) {
      this.BulkInsert(tree)
    } else {
      console.log('please input a number of array')
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
}

let node = [4,1,5]
let tree = new BinarySearchTree(node)
tree.insert(2)

console.log(tree.showTree())