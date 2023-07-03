import * as React from 'react'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export default function useForm() {
  const InitData = {
    name: '',
    opts: '',
    radios: ''
  }
  const [formData, setFormData] = useState(InitData)
  const setFormItem = useCallback((type: string, value: string) => {
    console.log('type', type, value)
    setFormData({
      ...formData,
      [type]: value
    })
  }, [])
  const reset = useCallback(() => {
    setFormData(InitData)
  }, [])

  return [formData, setFormItem, reset]
}
