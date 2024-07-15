import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Create() {
  const [groupname, setGroupname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const response = await axios.post(
          "https://chat-express-zpxu.onrender.com/api/groups",
          {
            group_name: groupname,
          }
        );
        console.log("Group created:", response.data);
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/select"
      >
        戻る
      </Button>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            グループ名を入力してください
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-1">
              <TextField
                required
                margin="none"
                id="username"
                name="username"
                variant="outlined"
                label="グループ名"
                type="text"
                fullWidth
                value={groupname}
                onChange={(e) => setGroupname(e.target.value)}
                className="!mb-3"
              />
            </div>
            <div className="flex justify-center">
              <Button variant="contained" type="submit">
                グループ作成
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
