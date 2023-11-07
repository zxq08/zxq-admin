import * as React from 'react'
import { useState, useEffect } from 'react'
import { Spin } from 'antd'

function MicroAppLayout() {
  return (
    <div
      id="microApp"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin tip="加载中，请稍后..." />
    </div>
  )
}

export default MicroAppLayout
