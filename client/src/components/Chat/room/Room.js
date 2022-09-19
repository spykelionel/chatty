import React from 'react'
import { Link } from 'react-router-dom'

function Room({ room }) {
  return (
    <div>
        <Link to={`/room/${room._id}`}>{room.name}</Link>
    </div>
  )
}

export default Room