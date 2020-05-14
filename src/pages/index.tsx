import * as React from "react"
import "./mystyles.sass"

import Layout from "../components/layout"

type IndexPageProps = {
  location: Location
}

export const IndexPage = ({ location }: IndexPageProps) => (
  <Layout location={location} title={`Home`}>
    <h2 className="subtitle">
      Hey people{` `}
      <span role="img" aria-label="wave emoji">
        👋
      </span>
    </h2>
    <p>You are on the home page of my web site. Welcome!</p>
    <p>
      I am a technical architect, living and working in London building useful
      things.
    </p>
  </Layout>
)

export default IndexPage
