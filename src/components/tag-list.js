import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagList = ({tags}) =>
  (
    <ul className="tag-list">
        {tags.map((tag, index) => (
          <li key={tag}>
              <Link to={`blog/tags/${kebabCase(tag)}/`}>
                  {tag}
              </Link>
              {index < tags.length - 1 ? `, ` : ``}
          </li>
        ))}
    </ul>
  )

export default TagList
