import { TextField } from "@mui/material";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Registry() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    navigate("/select");
  };

  return (
    <div className={"min-h-screen flex items-center justify-center bg-black"}>
      <div className={"bg-white p-8 rounded-lg shadow-md w-[400px]"}>
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-2xl font-crimson-text font-bold items-center text-center text-gray-800 mb-6">
            ログイン
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-1">
              <TextField
                id="username"
                variant="outlined"
                label="ユーザー名"
                type="text"
                fullWidth
                aria-required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-1 relative">
              <TextField
                id="password"
                variant="outlined"
                label="パスワード"
                type="password"
                autoComplete="current-password"
                aria-required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
              >
                新規登録
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registry;
