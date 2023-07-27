import React, { useState, useEffect, useRef } from 'react'
import { isEqual } from 'lodash-es'

export const useDeepCompareEffect = (effectCb, devs, compareFn) => {
  if (!compareFn) {
    compareFn = isEqual
  }
  const devsRef = useRef([])
  if (!compareFn(devsRef.current, devs)) {
    devsRef.current = devs
  }
  useEffect(effectCb, devsRef.current)
}
