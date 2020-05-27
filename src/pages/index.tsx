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
    <article className="section">
      <ul>
        <li>
          <span role="img" aria-label="Globe showing Europe emoji">
            🌍
          </span>
          I am a software developer and technical architect.
        </li>
        <li>
          <span role="img" aria-label="Koala emoji">
            🐨
          </span>
          Australian discovering London with my family.
        </li>
        <li>
          <span role="img" aria-label="Floppy disk emoji">
            💾
          </span>
          Computers have always been my primary creative outlet and work.
        </li>
        <li>
          <span role="img" aria-label="Thumbs up emoji">
            👍
          </span>
          Welcome!
        </li>
      </ul>

      <div className="box">
        <ul>
          <li>
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
            {` `}
            Currently completing the Microsoft Build Cloud Skills Challenge 2020
            and studying for Azure exams.
          </li>
        </ul>
      </div>
    </article>
  </Layout>
)

export default IndexPage
