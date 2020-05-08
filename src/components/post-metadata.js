import React from "react"
import Timestamp from "./timestamp"
import TagList from "./tag-list"
import Image from "gatsby-image"

const PostMetadata = ({ dateTime, tags, avatar, author }) => (
  <div className="blog-metadata has-text-grey">
    {avatar && (
      <Image
        fixed={avatar}
        alt={author}
        className="image is-48x48 is-rounded"
      />
    )}
    <Timestamp dateTime={dateTime} />
    {tags && <span className="blog-metadata-separator is-hidden-mobile" />}
    <TagList tags={tags} />
  </div>
)

export default PostMetadata
