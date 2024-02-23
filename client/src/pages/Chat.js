/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code




/// Imports and dependencies (Chat page is  depended on the matchList and ChatInteraction components)
import React, { useState } from 'react';
import MatchList from '../components/MatchList';
import ChatInterface from '../components/ChatInteraction';



function Chat({ jwt }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleMatchSelect = (match) => {
    setSelectedMatch(match); /// opens the match data based on the pressed match object
  };

  return (
    <div className='chat-container'>
      <MatchList jwt={jwt} onSelectMatch={handleMatchSelect} />
      <div className='chat-interface-container'>
        {selectedMatch && <ChatInterface match={selectedMatch} jwt={jwt} />}
      </div>
    </div>
  );
}

export default Chat;