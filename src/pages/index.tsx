import * as React from "react"

import Layout from "../components/layout"

type IndexPageProps = {
  location: Location
}

export const IndexPage = ({ location }: IndexPageProps) => (
  <Layout location={location} title={`Home`} className={`home`}>
    <h2 className="subtitle">
      Hello!{` `}
      <span role="img" aria-label="Waving hand emoji">
        👋
      </span>
    </h2>
    <article>
      <div className="columns">
        <div className="column is-narrow">
          <span role="img" aria-label="Globe showing Europe emoji">
            🌍
          </span>
        </div>
        <div className="column">
          I am a software developer and technical architect.
        </div>
      </div>
      <div className="columns">
        <div className="column is-narrow">
          <span role="img" aria-label="Koala emoji">
            🐨
          </span>
        </div>
        <div className="column">
          Australian discovering London with my family.
        </div>
      </div>
      <div className="columns">
        <div className="column is-narrow">
          <span role="img" aria-label="Floppy disk emoji">
            💾
          </span>
        </div>
        <div className="column">
          Computers have been my primary creative outlet and work since
          childhood.
        </div>
      </div>
      <div className="columns">
        <div className="column is-narrow">
          <span role="img" aria-label="Thumbs up emoji">
            👍
          </span>
        </div>
        <div className="column">Welcome!</div>
      </div>
      <div className="columns box">
        <div className="column is-narrow">
          <span role="img" aria-label="Rocket emoji">
            🚀
          </span>
        </div>
        <div className="column">
          Currently &quot;attending&quot; Microsoft Build and working on{` `}
          <a href="https://alexangas.com">alexangas.com</a>.
        </div>
      </div>
    </article>
  </Layout>
)

export default IndexPage
