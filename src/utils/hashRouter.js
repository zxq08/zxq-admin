function HashRouter() {
  this.routes = {}
  this.refresh = this.refresh.bind(this)
  // 页面首次加载不会触发 hashchange
  window.addEventListener('load', this.refresh)
  window.addEventListener('hashchange', this.refresh)
}

HashRouter.prototype.route = (path, cb) => {
  if (!this.routes) {
    this.routes = {}
  }
  this.routes[path] = cb
}

HashRouter.prototype.refresh = () => {
  const path = `/${location.hash.slice(1) || ''}`
  const cb = this.routes[path]
  cb && cb()
}

// use Router
const Router = new HashRouter()

Router.route('/', function () {
  changeBgColor('white')
})

Router.route('/green', function () {
  changeBgColor('green')
})

Router.route('/gray', function () {
  changeBgColor('gray')
})

const body = document.querySelector('body')

function changeBgColor(color) {
  body.style.backgroundColor = color
}
