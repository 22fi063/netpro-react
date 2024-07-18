import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

type Message = {
  message: string;
  eventId: string;
  userName: string;
};

function Chat() {
  const location = useLocation();
  const { eventId, eventName, userName } = location.state || {};
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!eventId) {
      console.error('event ID is missing');
      return;
    }

    ws.current = new WebSocket(`wss://chat-express-zpxu.onrender.com/ws?eventId=${eventId}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };
    ws.current.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [eventId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "" && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const newMessage = { message: inputMessage, eventId, userName };
      ws.current.send(JSON.stringify(newMessage));
      setInputMessage("");
    }
  };

  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/home"
      >
        戻る
      </Button>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            グループ名：{eventName}
          </h2>
          <Paper
            elevation={3}
            className="flex-grow overflow-auto mb-4 p-4"
            style={{ maxHeight: "400px", maxWidth: "400px", overflow: "auto" }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${message.userName}: ${message.message}`} />
                </ListItem>
              ))}
            </List>
            <div ref={messagesEndRef} />
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
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;