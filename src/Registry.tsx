import { Alert, Button, Link as MuiLink, TextField } from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "./firebase";

function Registry() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000); // 3秒後にエラーメッセージを消す
      return () => clearTimeout(timer); // コンポーネントがアンマウントされる時にタイマーをクリア
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      let userCredential = null;
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await axios.post("http://localhost:3000/api/registry", {
        firebase_uid: userCredential.user.uid,
        email: email,
        name: username,
      });
      userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate("/new");
    } catch (error) {
      setError("登録に失敗しました");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
          新規登録
        </h2>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
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
            className="!mb-3"
          />
          <TextField
            required
            margin="none"
            id="confirm-password"
            variant="outlined"
            label="確認用パスワード"
            type="password"
            autoComplete="current-password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            <MuiLink component={RouterLink} to="/login" className="!text-lg">
              ログインする方はこちら
            </MuiLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registry;
