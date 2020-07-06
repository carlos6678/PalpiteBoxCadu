import React from 'react'
import Head from 'next/head'

function PageTitle({page}) {
  return(
      <Head>
          <title>{page}</title>
      </Head>
  );
}

export default PageTitle;