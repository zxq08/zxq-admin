import { registerMicroApps, start, RegistrableApp, ObjectType } from 'qiankun'

const MICRO_CONFIG: RegistrableApp<ObjectType>[] = [
  {
    name: 'micro-app', // 应用的名字 必填 唯一
    entry: process.env.MICRO_APP_URL!, // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: '#microApp', // 挂载具体容器 ID
    activeRule: '/micro/app', //  根据路由匹配，激活的子应用
    props: {
      baseInfo: 'zxq-admin'
    }
  }
]

console.log('config', MICRO_CONFIG)

registerMicroApps(MICRO_CONFIG)

export default function () {
  start()
}
