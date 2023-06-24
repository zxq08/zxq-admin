import * as React from 'react'
import { useState, useEffect } from 'react'
import { getPie3D, bindListen } from './util'
import cloneDeep from 'lodash-es/cloneDeep'
import * as echarts from 'echarts'
import 'echarts-gl'
import styles from './index.module.less'

const PieData = [
  {
    name: '林地面积统计',
    value: 10000,
    itemStyle: {
      color: '#22c4ff'
    }
  },
  {
    name: '草地面积统计',
    value: 12116,
    itemStyle: {
      color: '#aaff00'
    }
  },
  {
    name: '耕地地面积统计',
    value: 16616,
    itemStyle: {
      color: '#ffaaff'
    }
  }
]
function Charts() {
  const [data, setData] = useState(PieData)
  const [option, setOption] = useState<any>()

  const init = () => {
    const myChart = echarts.init(document.getElementById('chart-wrap')!)
    let _option = cloneDeep(option)
    _option = getPie3D(data, 0.8)
    // myChart.setOption(option);
    //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    _option.series.push({
      name: 'pie2d',
      type: 'pie',
      labelLine: {
        length: 10,
        length2: 10
      },
      startAngle: -20, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['20%', '50%'],
      center: ['50%', '50%'],
      data: data,
      itemStyle: {
        opacity: 0
      }
    })
    console.log('option', _option)
    bindListen(myChart, _option)
    myChart.setOption(_option)
    setOption(_option)
  }

  useEffect(() => {
    init()
  }, [data])

  return <div id="chart-wrap" className={styles['chart-wrap']}></div>
}

export default Charts
