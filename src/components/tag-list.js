import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { FaTag } from "react-icons/fa"

const TagList = ({ tags }) => {
  return tags ? (
    <div className="tags is-inline-block-tablet">
      {tags.map((tag) => (
        <Link key={tag} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">
          <span className="icon">
            <FaTag />
          </span>
          {tag}
        </Link>
      ))}
    </div>
  ) : null
}

export default TagList
