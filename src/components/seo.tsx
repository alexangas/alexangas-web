import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type SEOProps = {
  description?: string
  lang?: string
  meta?: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export const PureSEO = ({
  description,
  lang,
  title,
  data,
}: SEOProps): JSX.Element => {
  const {
    site: { siteMetadata },
  } = data
  const metaDescription = description || siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  )
}

PureSEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export const SEO = (props: SEOProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  return <PureSEO {...props} data={data} />
}

export default SEO
