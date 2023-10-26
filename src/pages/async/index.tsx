import React, { useState, useEffect, Suspense, lazy } from 'react'

const LazyCpn = lazy(() => import('./component'))

function Async() {
  return (
    <Suspense fallback={<div>外层加载...</div>}>
      <LazyCpn />
    </Suspense>
  )
}

export default Async
