import * as React from "react"
import { Link } from "gatsby"

import PostMetadata from "./post-metadata"

const PostSummary = ({
  slug,
  title,
  description,
  excerpt,
  dateTime,
  tags = [],
}) => (
  <div key={slug} className="content">
    <h2 className="subtitle is-marginless is-4">
      <Link to={`/blog${slug}`}>{title}</Link>
    </h2>
    <p
      className="is-marginless"
      dangerouslySetInnerHTML={{
        __html: description || excerpt,
      }}
    />
    <PostMetadata dateTime={dateTime} tags={tags} />
  </div>
)

export default PostSummary
