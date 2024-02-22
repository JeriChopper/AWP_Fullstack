import React, { useState, useEffect } from 'react';
import MatchList from '../components/MatchList';
import ChatInterface from '../components/ChatInteraction';

function Chat({ jwt }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
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