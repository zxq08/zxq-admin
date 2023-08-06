import * as React from 'react'
import { useState, useEffect, FC } from 'react'
import styles from './index.module.less'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface SlideProps {
  data?: any
}

const DIVS = [
  {
    color: 'red',
    name: 1
  },
  {
    color: 'yellow',
    name: 2
  },
  {
    color: 'green',
    name: 3
  },
  {
    color: 'blue',
    name: 4
  },
  {
    color: 'pink',
    name: 5
  },
  {
    color: 'lightblue',
    name: 6
  }
]

const Slide: FC<SlideProps> = props => {
  const [current, setCurrent] = useState(0)
  const [slideX, setSlideX] = useState(0)

  useEffect(() => {
    AOS.init()
  }, [])

  const handlePrev = () => {
    if (current === 0) {
      return
    } else {
      setCurrent(prevCurrent => prevCurrent - 1)
    }
  }

  const handleNext = () => {
    if (current === 3) {
      return
    } else {
      setCurrent(prevCurrent => prevCurrent + 1)
    }
  }

  useEffect(() => {
    const newSlidexX = -1 * current * 300
    console.log('now current', current, newSlidexX)
    setSlideX(newSlidexX)
  }, [current])

  return (
    <div>
      <button onClick={handlePrev}>prev</button>
      <div className={styles['wrap']}>
        <div
          className={styles['content']}
          style={{ transform: `translateX(${slideX}px)` }}
        >
          {DIVS.map((item: any) => {
            return (
              <div
                data-aos="fade-up-right"
                data-aos-once="false"
                key={item.name}
                className={`${styles['div']}`}
                style={{ background: item.color }}
              >
                {item.name}
              </div>
            )
          })}
        </div>
      </div>

      <button onClick={handleNext}>next</button>
    </div>
  )
}

export default Slide
