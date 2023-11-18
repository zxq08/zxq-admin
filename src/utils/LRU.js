/**
 * 设计和实现一个LRU（最近最少使用）缓存机制，支持get获取和put写入。
 * put时如果数据满了，自动删除最久未使用的数据
 * 时间复杂度 O(1)
 */

class LRU {
  constructor(propsSize = 3) {
    this.store = new Map()
    this.size = propsSize
  }

  get(key) {
    let current = -1
    if (this.store.has(key)) {
      current = this.store.get(key)
      this.store.delete(key)
      this.store.set(key, current)
    }
    return current
  }

  put(key, value) {
    if (this.store.has(key)) {
      this.store.delete(key)
    } else if (this.store.size === this.size) {
      this.store.delete(this.store.keys().next().value)
    }
    this.store.set(key, value)
  }
}

const lruObj = new LRU(3)
lruObj.put(0, 'zxq')
console.log('lru', lruObj)
lruObj.put(1, 'zxq08')
console.log('lru', lruObj)
lruObj.put(2, 'sasa')
console.log('lru', lruObj)
lruObj.put(0, 'zxq')
console.log('lru', lruObj)
lruObj.put(3, 'zxqsasa')
console.log('lru', lruObj)
