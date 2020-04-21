const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/improving-entity-framework-performance`,
    isPermanent: true,
    toPath: `/blog/improving-entity-framework-performance`,
  })

  createRedirect({
    fromPath: `/common-nvda-keyboard-shortcuts-for-web-developers`,
    isPermanent: true,
    toPath: `/blog/common-nvda-keyboard-shortcuts-for-web-developers`,
  })

  const result = await graphql(
    `
      {
        posts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const posts = result.data.posts.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Make tag pages
  const tagTemplate = path.resolve(`./src/templates/tags.js`)
  const tags = result.data.tagsGroup.group
  tags.forEach((tag) => {
    createPage({
      path: `blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
