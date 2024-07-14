import { Button, Link as MuiLink, TextField } from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  User, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "./firebase";

function Registry() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userCredential = null;
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await axios.post('https://chat-express-zpxu.onrender.com/api/signup', {
          firebase_uid: userCredential.user.uid,
          email:email,
          name:username
        }); 
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log(user);
      navigate("/select");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl mb-10">新規登録</h1>
    <form className="w-5/12" onSubmit={handleSubmit}>
      <TextField
        required
        margin="none"
        id="username"
        variant="outlined"
        label="ユーザー名"
        type="text"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="!mb-3"
      />
      <TextField
        required
        margin="none"
        id="email"
        variant="outlined"
        label="メールアドレス"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="!mb-3"
      />
      <TextField
        required
        margin="none"
        id="password"
        variant="outlined"
        label="パスワード"
        type="password"
        autoComplete="current-password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="!mb-10"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        className="!mb-3 !text-xl"
      >
        新規登録
      </Button>
      <div className="text-center mt-4">
          <MuiLink
            component={RouterLink}
            to="/login"
            className="!text-lg"
          >
            ログインする
          </MuiLink>
        </div>
    </form>
  </div>
  );
}

export default Registry;
