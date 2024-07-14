import React, { useEffect, useRef, useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Message = {
  text: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://chat-express-zpxu.onrender.com/ws');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };
    ws.current.onmessage = (event) => {
      const newMessage: Message = { text: event.data };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '' && ws.current) {
      ws.current.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <Container maxWidth="sm" className="h-screen flex flex-col py-8">
      <Typography variant="h4" component="h1" gutterBottom className="text-center">
        WebSocket Chat
      </Typography>
      <Paper elevation={3} className="flex-grow overflow-auto mb-4 p-4">
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <form onSubmit={sendMessage} className="flex">
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="mr-2"
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          endIcon={<SendIcon />}
        >
        </Button>
      </form>
    </Container>
  );
}

export default Chat;