import * as React from 'react'
import { useState, useEffect, FC, useRef, useMemo } from 'react'
import useScroll from './hooks/useScroll'
import style from './index.module.less'

const Srcoll: FC = () => {
  const scrollRef = useRef(null)
  const [topStyle, btnStyle] = useScroll()

  return (
    <div className={style.wrap}>
      <div className={style['scroll-wrap']} ref={scrollRef}>
        <div className={style['top-wrap']} style={topStyle}></div>
        <div className={style['btn']} style={btnStyle}></div>
      </div>
    </div>
  )
}

export default Srcoll
