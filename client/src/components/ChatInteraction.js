import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const ChatInteraction = ({ match, jwt }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
            setMessages([...messages, data.messages]);
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
          <div key={message.id} style={{ marginBottom: '10px' }}>
            <Typography variant="caption">{message.sender.email}:</Typography>
            <Typography variant="body1">{message.content}</Typography>
            <Typography variant="caption">
              {new Date(message.timestamp).toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
      <TextField
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        variant="outlined"
        fullWidth
        label="Type a message"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send Message
      </Button>
    </div>
  );
};


export default ChatInteraction;