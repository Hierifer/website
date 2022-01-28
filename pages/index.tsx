import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './main.module.css'

import Basiclayout from './layouts/index'

import React from 'react'
import { Button } from 'antd'

const Home: NextPage = () => {
  return (
    <Basiclayout className={styles.container}>
      <Button type="primary">Hello Antd</Button>
    </Basiclayout>
  )
}

export default Home
