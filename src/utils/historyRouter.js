// pushState(state, title, url): (popstate回调参数，标题，同源新url)
// replaceState(stateObj, title, url): (popstate回调参数，标题，同源新url)
// popstate   pushState 和 replaceState 不会出发，forward 、go 和 back 会触发

function HistoryRouter() {
  this.routes = {}

  history.replaceState({ path: location.pathname }, null, location.pathname)
  this.invokePathCallback(location.pathname)

  window.addEventListener('popstate', e => {
    const path = e.state && e.state.path
    this.invokePathCallback(path)
  })
}

HistoryRouter.prototype.Route = (path, cb) => {
  if (!this.routes) {
    this.routes = {}
  }
  this.routes[path] = cb
}

HistoryRouter.prototype.invokePathCallback = path => {
  const cb = this.routes[path]
  cb && cb()
}

HistoryRouter.prototype.Push = path => {
  history.pushState({ path }, null, path)
  this.invokePathCallback(path)
}

const Router = new HistoryRouter()

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
const container = document.querySelector('.container')

function changeBgColor(color) {
  body.style.backgroundColor = color
}

container.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.push(e.target.getAttribute('href'))
  }
})
