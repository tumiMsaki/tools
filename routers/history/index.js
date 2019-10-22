class historyRouter {
  constructor() {
    this.routers = {}
    this.listenPopState();
    this.listenLink();
  }

  listenPopState(){
    window.addEventListener('popstate',(e)=>{
        let state = e.state || {},
            path = state.path || '';
        this.dealPathHandler(path)
    },false)
}

  listenLink(){
      window.addEventListener('click',(e)=>{
          let dom = e.target;
          if(dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')){
              e.preventDefault()
              console.log(dom.getAttribute('href'))
              this.assign(dom.getAttribute('href'));
          }
      },false)
  }
  load() {
    let path = location.pathname
    this.dealPathHandler(path)
  }

  register(path, cb) {
    this.routers[path] = cb
  }
  registerIndex(cb) {
    this.routers['/'] = cb
  }
  registerNotFound(cb) {
    this.routers['404'] = cb
  }
  registerError(cb) {
    this.routers['error'] = cb
  }

  assign(path){
    history.pushState({path},null,path);
    this.dealPathHandler(path)
}

  repalce(path) {
    history.replaceState({path},null,path)
    this.dealPathHandler(path)
  }

  dealPathHandler(path) {
    let handler 
    if (!this.routers.hasOwnProperty(path)) {
      handler = this.routers['404']
    } else {
      handler = this.routers[path]
    }

    try {
      handler.call(this)
    } catch (err) {
      this.routers['error'].call(this)
    }
  }
}

let router = new historyRouter();
let container = document.querySelector('.container')

router.registerIndex(() => container.innerHTML = '我是首页');

router.register('/page1', () => container.innerHTML = '我是page1');
router.register('/page2', () => container.innerHTML = '我是page2');
router.register('/page3', () => container.innerHTML = '我是page3');
router.register('/page4', () => {
    throw new Error('抛出一个异常')
});

router.registerNotFound(() => container.innerHTML = '页面未找到');

router.registerError(() => container.innerHTML = '页面异常，错误消息');

router.load();