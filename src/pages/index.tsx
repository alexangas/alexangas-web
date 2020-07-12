import * as React from "react"

import Layout from "../components/layout"

type IndexPageProps = {
  location: Location
}

export const IndexPage = ({ location }: IndexPageProps): JSX.Element => (
  <Layout location={location} title={`Home`} className={`home`}>
    <h2 className="subtitle">
      Hello!{` `}
      <span role="img" aria-label="Waving hand emoji">
        👋
      </span>
    </h2>
    <article className="section mt-5">
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

      <div className="box mt-5">
        <ul>
          <li>
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
            {` `}
            {/*Updating <a href="https://supportmusic.online">supportmusic.online</a>.*/}
            {/*Turning my Azure knowledge into certification.*/}
            {/*Planning blog posts and refreshing{` `}*/}
            {/*<a href="https://alexangas.com">alexangas.com</a>.*/}
            Giving{` `}
            <a href="https://github.com/alexangas/podcast-feed-reader">
              podcast-feed-reader
            </a>{` `}
            some love.
          </li>
        </ul>
      </div>
    </article>
  </Layout>
)

export default IndexPage
