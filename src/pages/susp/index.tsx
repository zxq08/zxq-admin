import * as React from 'react'
import { useState, useEffect, Suspense, lazy } from 'react'
import Sub from './sub'

function Susp() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  // const Sub = lazy(() =>
  // Promise.resolve({
  //     default: ({ count }: any) => <div className='sub'>I am sub, request success, count is {count}</div>
  // })
  // )

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Sub count={count} />
      </Suspense>
      <div>count is {count}</div>
    </>
  )
}

export default Susp
