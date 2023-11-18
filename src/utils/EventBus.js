/**
 * 题目描述:实现一个发布订阅模式拥有 on emit once off 方法
 */

class Event {
  constructor() {
    this.eventList = {}
  }

  on(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  }

  emit(key, args) {
    const fnList = this.eventList[key]
    if (Array.isArray(fnList) && fnList.length) {
      fnList.forEach(f => f(args))
    }
  }

  once(key, fn) {
    const _fn = () => {
      fn()
      this.off(key, _fn)
    }
    this.on(key, _fn)
  }

  off(key, fn) {
    const fnList = this.eventList[key]
    if (Array.isArray(fnList) && fnList.length) {
      this.eventList[key] = fnList.filter(f => f !== fn)
    }
  }
}

const eventBus = new Event()
const fn = () => {
  console.log('for dbClick')
}
eventBus.on('click', () => {
  console.log('for click')
})
eventBus.on('dbClick', fn)
eventBus.once('noClick', () => {
  console.log('for noClick')
})

eventBus.emit('click')
eventBus.emit('dbClick')
eventBus.emit('noClick')
eventBus.off('dbClick', fn)
eventBus.emit('dbClick')
