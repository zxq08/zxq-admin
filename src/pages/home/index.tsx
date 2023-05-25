import * as React from 'react'
import {
  //  useState, useEffect,
  FC
} from 'react'
import { Typography } from 'antd'

import styles from './index.module.less'

import { Outlet } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

interface HomePageProps {
  element?: any
}

const HomePage: FC<HomePageProps> = props => {
  return (
    <div className={styles.wrap}>
      <Typography>
        <Title>Introduction {props.element}</Title>
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
