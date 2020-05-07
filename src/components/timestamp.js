import React from "react"
import dayjs from "dayjs"

const Timestamp = ({ dateTime }) => (
  <div className="is-inline-block">
    <time dateTime={dateTime}>{dayjs(dateTime).format(`D MMMM YYYY`)}</time>
  </div>
)

export default Timestamp
