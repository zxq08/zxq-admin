import * as React from 'react'
import { useState, useEffect } from 'react'

function Sub({ count }: any) {
  const [child, setChild] = useState<any>()

  setTimeout(() => {
    setChild(true)
  }, 3000)
  return (
    child && (
      <div className="sub">I am sub, request success, count is {count}</div>
    )
  )
}

export default Sub
