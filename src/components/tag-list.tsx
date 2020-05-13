import * as React from 'react'
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import { FaTag } from "react-icons/fa"

const TagList = ({ tags }) =>
  tags ? (
    <div className="tags is-inline-block-tablet">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/blog/tags/${kebabCase(tag)}/`}
          className="tag is-paddingless"
        >
          <span className="icon">
            <FaTag />
          </span>
          {tag}
        </Link>
      ))}
    </div>
  ) : null

export default TagList
