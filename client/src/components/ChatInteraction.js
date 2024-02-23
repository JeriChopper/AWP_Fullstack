/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code



/// Imports and dependencies
import React, { useState, useEffect } from 'react';
import {Typography, TextField, Button } from '@mui/material';


/// Chatinteraction component. Point is to make Frontend implementation for the Chat logic as a component to ease the code on the page side. 
/// Inspiration to make chatInteraction work: https://www.youtube.com/watch?v=otaQKODEUFs


const ChatInteraction = ({ match, jwt, userId }) => {
  const [messages, setMessages] = useState([]); /// Array where all messages are and will be set
  const [newMessage, setNewMessage] = useState(''); /// Takes input as a string 

  useEffect(() => {
    const fetchMessages = async () => {
      if (match) {
        try {
          const response = await fetch(`/messages/${match.id}/all`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            mode: 'cors',
          });

          const data = await response.json();
          if (data.success) {
            setMessages(data.messages || []); /// if data.messages is empty, put empty array.
          } else {
            console.error('Failed to fetch messages:', data.message);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages(); // Fetches messages until there are not any new to fetch. 
  }, [match, jwt]); /// trigger again if jwt or match changes

  const handleSendMessage = async () => {
    if (match && newMessage.trim() !== '') { /// exclude empty whitespace etc
      try {
        const response = await fetch(`/messages/${match.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ content: newMessage }), // took sender as a value for possible chat manipulation
        });

        const data = await response.json();
        if (data.success) {
            console.log('Received messages:', data.message);
            setMessages([...messages, ...data.message]); // Update with the sent message
            setNewMessage('');
        } else {
          console.error('Failed to send message:', data.messages);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };


  /// Return renders the chat interface with message history and input box


  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="caption">{message.sender.email}:</Typography>
            <Typography variant="body1">{message.content}</Typography>
            <Typography variant="caption">
              {new Date(message.timestamp).toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          fullWidth
          label="Type a message"
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
          Send Message
        </Button>
      </div>
    </div>
  );
}

export default ChatInteraction;