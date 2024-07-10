import { TextField } from "@mui/material";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    navigate("/select");
  };

  return (
    <div className="bg-[#212A30] min-h-screen justify-center flex flex-col items-center">
      <div className="flex flex-col items-center mt-24">
        <h2 className="text-black text-xl font-roboto mb-24">
        ログイン
        </h2>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          <div className="mt-4">
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
          <div className="flex flex-col">
            <Button
              variant="contained"
              type="submit"
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              ログイン
            </Button>
            <RouterLink to="/registry" className="no-underline">
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
                >
                  新規登録
                </Button>
              </div>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
