// js 的数据类型
const JSType = {
  OBJECT: '[object Object]',
  ARRAY: '[object Array]',
  FUNCTION: '[object Function]',
  MAP: '[object Map]',
  SET: '[object Set]',
  DATE: '[object Date]',
  REGEXP: '[object RegExp]'
}

// 拷贝函数处理器
const COPIER_HANDLE = {
  [JSType.OBJECT]: objectCopier,
  [JSType.ARRAY]: arrayCopier,
  [JSType.FUNCTION]: functionCopier,
  [JSType.MAP]: mapCopier,
  [JSType.SET]: setCopier,
  [JSType.DATE]: dateCopier,
  [JSType.REGEXP]: regExpCopier
}

/**
 * 获取给定数据的类型
 * @param data 目标数据
 * @returns 类型字符串
 */
function getDataType(data) {
  return Object.prototype.toString.call(data)
}

/**
 * 获取对应类型的空白数据
 * @param data 被克隆的数据
 * @returns 对应类型的空白数据
 */
function getRelativeEmptyData(data) {
  return new data.constructor()
}

function objectCopier(clone, data) {
  Object.keys(data).forEach(key => (clone[key] = deepClone(data[key])))
  return clone
}

function arrayCopier(clone, data) {
  data.forEach((item, index) => (clone[index] = deepClone(item)))
  return clone
}

function mapCopier(clone, data) {
  data.forEach((value, key) => clone.set(key, deepClone(value)))
  return clone
}

function setCopier(clone, data) {
  data.forEach(value => clone.add(deepClone(value)))
  return clone
}

function dateCopier(clone, data) {
  clone = new Date(data)
  return clone
}

function regExpCopier(clone, data) {
  clone = new RegExp(data.source, data.flags)
  return clone
}

// function functionCopier(clone, data) {
//     clone = function (this, ...args) {
//         return data.call(this, ...args)
//     }
//     return clone
// }
function functionCopier(clone, data) {
  clone = function () {
    return data.apply(this, arguments)
  }
  return clone
}

/**
 * 用于存放存在循环引用的数据
 * 每次深拷贝数据前，都先判断该数据是否以存在于globalMap中
 * 存在的话直接返回从globalMap获取的数据即可。
 * 然后在每次创建完空白数据后，都以被拷贝数据为key，以拷贝数据为value，存放到globalMap去。
 */
const globalMap = new WeakMap()

function deepClone(data) {
  // 普通类型数据则直接返回
  if (!(data instanceof Object)) {
    return data
  }

  // 循环引用处理
  if (globalMap.has(data)) return globalMap.get(data)

  // 1. 创建对应类型的空白数据
  let clone = getRelativeEmptyData(data)
  globalMap.set(data, clone)

  // 2. 复制
  const copierHandler =
    COPIER_HANDLE[getDataType(data)] ??
    function () {
      return data
    }
  clone = copierHandler(clone, data)

  // 3. 返回
  return clone
}

const testData = {
  // String
  field_1: '',
  field_2: 'test test',
  // Number
  field_3: 1,
  field_4: -1,
  field_5: 0,
  // Boolean
  field_6: false,
  field_7: true,
  // null
  field_8: null,
  // undefined
  field_9: undefined,
  // Symbol
  field_10: Symbol(''),
  field_11: Symbol('1111'),
  // Object
  field_12: { a: 1, b: 2 },
  field_13: {
    a: 1,
    b: 2,
    c: { c1: 3, c2: 4, c3: {} },
    d: [1, 2, '', true, false]
  },
  // Array
  field_14: [1, 2, '', true, false],
  field_15: [[1, 2], { a: 1, b: 2 }],
  // Map
  field_16: new Map([
    ['a', 1],
    ['b', 2],
    ['c', 5]
  ]),
  // Set
  field_17: new Set([
    1,
    2,
    3,
    '',
    true,
    false,
    ['a', 'b', 'c'],
    { a: 1, b: 2 }
  ]),
  // Function
  field_18: function (x, y) {
    return x + y
  },
  field_19: txt => console.log('[field_19] ===> ', txt),
  // Date
  field_20: new Date(),
  field_21: Date.now(),
  // RegExp
  field_22: /^a.*b$/gi,
  field_23: new RegExp('^b.*c$', 'ig')
}

// 循环引用
testData.field_13.c.c3 = testData.field_13.c

// 验证
const cloneData = deepClone(testData)
console.log({ testData, cloneData, result: cloneData === testData })
window.cloneData = cloneData
window.testData = testData
