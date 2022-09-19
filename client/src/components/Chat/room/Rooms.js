import React from 'react'
import Room from './Room'
import useRoom from './useRoom'

function Rooms() {
    const {rooms} = useRoom()
  return (
    <ul className="">
       {
        rooms.map((room, idx)=>(
            <Room room={room} key={room._id}/>
        ))
       } 
    </ul>
  )
}

export default Rooms