import * as React from "react"

import Layout from "../components/layout"

type NotFoundPageProps = {
  location: Location
}

export const NotFoundPage = ({ location }: NotFoundPageProps): JSX.Element => (
  <Layout location={location} title={`Not Found`}>
    <p>You just hit a route that does not exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
