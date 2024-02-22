import React, { useState, useEffect } from 'react';

const ChatInteraction = ({ match, jwt }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (match) {
        try {
          const response = await fetch(`/messages/${match.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            mode: 'cors',
          });

          const data = await response.json();
          if (data.success) {
            setMessages(data.messages || []);
          } else {
            console.error('Failed to fetch messages:', data.message);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [match, jwt]);

  const handleSendMessage = async () => {
    if (match && newMessage.trim() !== '') {
      try {
        const response = await fetch(`/messages/${match.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ content: newMessage }),
        });

        const data = await response.json();
        if (data.success) {
          setMessages([...messages, data.message]);
          setNewMessage('');
        } else {
          console.error('Failed to send message:', data.message);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatInteraction;