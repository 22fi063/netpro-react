import { Button, Link as MuiLink, TextField, Alert } from "@mui/material";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState ,useEffect} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [count, setCount]  = useState(0);


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
    try {
      let userCredential = null;
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log(user);
      setCount(0);
      if(count==0){
        navigate("/select");
      }
      navigate("/home");
    } catch (error) {
      setError("メールアドレスまたはパスワードが間違っています");
      setPassword("");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
          ログイン
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
            ログイン
          </Button>
          <div className="text-center mt-4">
            <MuiLink component={RouterLink} to="/registry" className="!text-lg">
              新規登録の方はこちら
            </MuiLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
