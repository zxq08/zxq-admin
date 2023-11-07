import * as React from 'react'
import { useState, useEffect } from 'react'
import init from '../../qiankun'
import MicroAppLayout from '../../pages/MicroAppLayout'

export function Micro() {
  useEffect(() => {
    console.log('111')
    init()
  }, [])

  return (
    <div>
      There is loading micro wrap
      <MicroAppLayout />
    </div>
  )
}

export const microRoute = [
  {
    path: '/micro/app',
    element: <Micro></Micro>
    // async lazy() {
    //     let MicroAppLayout = await import("../../pages/MicroAppLayout");
    //     console.log('micro route')
    //     return {
    //         Component: () => <Micro children={MicroAppLayout} />
    //     };
    // },
  }
]
