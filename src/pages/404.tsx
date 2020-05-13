import * as React from "react"

import Layout from "../components/layout"

export const NotFoundPage = ({ location }) => (
  <Layout location={location} title={`Not Found`}>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
