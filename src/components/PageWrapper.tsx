import Head from 'next/head'
import Script from 'next/script'
import React, { FC } from 'react'

type PropsType = {
  title: string
  desc?: string
  css?: string
  js?: string
  children: JSX.Element | JSX.Element[]
}

const PageWrapper: FC<PropsType> = (props) => {
  const { children, title, desc = '', js = '', css = '' } = props
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{css}</style>
      </Head>
      <style>{css}</style>
      <main>{children}</main>
      <Script id="page-js">{js}</Script>
    </>
  )
}

export default PageWrapper
