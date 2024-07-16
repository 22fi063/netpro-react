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
import { Link as RouterLink } from "react-router-dom";

type Message = {
  text: string;
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://chat-express-zpxu.onrender.com/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
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
    if (inputMessage.trim() !== "" && ws.current) {
      ws.current.send(inputMessage);
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
        <div className="bg-white p-8 rounded-lg shadow-md w-[400]">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            おまつり
          </h2>
          <Paper
            elevation={3}
            className="flex-grow overflow-auto mb-4 p-4"
            style={{ maxHeight: "400px", maxWidth: "400px", overflow: "auto" }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${"message.name"}: ${message.text}`}
                  />
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
