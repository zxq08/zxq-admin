import * as React from 'react'
import {
  useState, //useEffect,
  FC
} from 'react'
import { Typography } from 'antd'
import styles from './index.module.less'
import { Outlet } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

interface HomePageProps {
  element?: any
}

const LIST = [
  {
    id: 1,
    group: 1
  },
  {
    id: 2,
    group: 1
  },
  {
    id: 3,
    group: 22
  }
]

const HomePage: FC<HomePageProps> = props => {
  const [num, setNum] = useState<number>(0)

  const onClick = () => {
    setTimeout(() => {
      setNum(num + 1)
      console.log(num)
    }, 2000)
  }

  const _list: any = []
  LIST.forEach((v, i) => {
    const hasVIndex = _list.findIndex((item: any) => item.group === v.group)
    if (hasVIndex === -1) {
      _list.push({ group: v.group, items: [] })
    } else {
      _list[hasVIndex].items.push(v)
    }
  })
  console.log('_list', _list)

  return (
    <div className={`${styles.wrap}`}>
      <Typography>
        <Title>
          Introduction {props.element}
          <button onClick={onClick}>num ++</button>
        </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
        <Paragraph>
          After massive project practice and summaries, Ant Design, a design
          language for background applications, is refined by Ant UED Team,
          which aims to{' '}
          <Text strong>
            uniform the user interface specs for internal background projects,
            lower the unnecessary cost of design differences and implementation
            and liberate the resources of design and front-end development
          </Text>
          .
        </Paragraph>
        <a href="/list">to list</a>

        <Outlet />
      </Typography>
    </div>
  )
}

export default HomePage
