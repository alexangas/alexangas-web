module.exports = {
  siteMetadata: {
    title: `Alex Angas`,
    author: `Alex Angas`,
    description: `The personal web site for Alex Angas.`,
    siteUrl: `https://www.alexangas.com/`,
    social: {
      linkedin: `alexangas`,
      github: `alexangas`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/blog${edge.node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog${edge.node.fields.slug}`,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { collection: { eq: "blog" } } }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Alex Angas",
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `project`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 90,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: "Default Light+",
                dark: "Default Dark+",
              },
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-9771527-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Angas`,
        short_name: `AA`,
        start_url: `/`,
        display: `browser`,
        icon: `content/assets/alex2017b_small_adj2_2.png`,
        legacy: false,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-meta-redirect`, // make sure to put last in the array
  ],
}
