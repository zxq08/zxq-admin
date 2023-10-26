import * as React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'

const getPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return '../../../iconfont'
  } else {
    return '/public/dist/public'
  }
}

export default createFromIconfontCN({
  scriptUrl: getPath() + '/iconfont/iconfont.js'
})
