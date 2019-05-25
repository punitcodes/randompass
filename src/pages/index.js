import React from 'react'

import { siteMetadata } from '../../gatsby-config'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import PasswordBox from 'components/PasswordBox'

class Index extends React.Component {
  render() {
    const { location, data } = this.props
    return (
      <div className="container">
        <Layout location={location}>
          <Meta site={siteMetadata} title="Random Password Generator" />
          <PasswordBox />
        </Layout>
      </div>
    )
  }
}

export default Index
