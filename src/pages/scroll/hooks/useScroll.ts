import * as React from 'react'
import {
  useState,
  useEffect,
  useRef,
  RefObject,
  CSSProperties,
  useCallback
} from 'react'

export default function useScroll() {
  const [topStyles, setTopStyles] = useState<CSSProperties>({
    opacity: 1
  })
  const [btnStyles, setBtnStyles] = useState<CSSProperties>({
    top: 360
  })

  const updateStyles = () => {
    console.log('scroll===111', window.scrollY, btnStyles, topStyles)
    const opacity = 1 - window.scrollY / 400
    let top = 360 - window.scrollY
    if (opacity > Number(topStyles.opacity)) {
      top = top < 360 ? (top > 20 ? top : 20) : 360
    } else {
      top = top > 20 ? top : 20
    }
    setTopStyles({ opacity })
    setBtnStyles({ top })
  }

  //useCallback(, [btnStyles])

  useEffect(() => {
    document.addEventListener('scroll', updateStyles)
    return () => {
      document.removeEventListener('scroll', updateStyles)
    }
  }, [topStyles.opacity, btnStyles.top])

  return [topStyles, btnStyles]
}
