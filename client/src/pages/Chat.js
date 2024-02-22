import React from 'react'
import MatchList from '../components/MatchList'

function Chat({jwt}) {
  console.log('JWT prop in Chat:', jwt);
  return (
    <div>
        <MatchList jwt={jwt}/>
    </div>
  )
}

export default Chat