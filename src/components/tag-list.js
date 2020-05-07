import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagList = ({ tags }) => {
  return (tags ?
      <div className="tags is-inline-block-tablet">
        {tags.map((tag) => (
          <Link key={tag} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">{tag}</Link>
        ))}
      </div>
      : null
    )
}

export default TagList
