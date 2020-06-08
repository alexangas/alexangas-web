import * as React from "react"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import { FaTag } from "react-icons/fa"

type TagListProps = {
  tags?: string[]
}

const TagList = ({ tags = [] }: TagListProps): JSX.Element | null =>
  tags ? (
    <div className="tags is-inline-block-tablet">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/blog/tags/${kebabCase(tag)}/`}
          className="tag is-paddingless"
        >
          <span className="icon mr-0">
            <FaTag />
          </span>
          {tag}
        </Link>
      ))}
    </div>
  ) : null

export default TagList
