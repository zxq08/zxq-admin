import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react'
function Lazy() {
  console.log('LazyComponent render')

  useEffect(() => {
    console.log('LazyComponent mount')
  }, [])

  const Child = useMemo(() => {
    console.log('useMemo回调执行啦')
    const LazyCpn = lazy(() =>
      Promise.resolve({ default: () => <div>子组件</div> })
    )
    return (
      <Suspense fallback={<div>内层加载...</div>}>
        <LazyCpn />
      </Suspense>
    )
  }, [])
  return Child
}

export default Lazy
