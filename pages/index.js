import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home() {
  return (
      <Layout
          meta={{
              title: 'メンバー名簿',
              description: 'メンバー管理',
          }}
      >
        <div>Homepage content</div>
      </Layout>
  )
}
