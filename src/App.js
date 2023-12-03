import React, { useState, useEffect , useRef} from 'react';
import './App.css';
import { Button, TextField, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(); 

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');
  
    socketRef.current.on('message', (message) => {
      setMessages((messages) => {
         
        return [...messages, message];
      });
    });
  
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input) {
      socketRef.current.emit('message', input); 
      setInput('');
    }
  };

  return (
    <Paper className="root">
      <Typography variant="h4">Chat Application</Typography>
      <List className="chatList">
        {messages.map((message, index) => (
          <ListItem key={index} className="chatMessage">
            <ListItemText primary={ message }  />
          </ListItem>
        ))}
      </List>
      <form onSubmit={sendMessage}>
        <TextField value={input} onChange={event => setInput(event.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Send Message</Button>
      </form>
    </Paper>
  );
}

export default App;
