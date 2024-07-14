import { Button, TextField } from "@mui/material";
import axios from 'axios';
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from './firebase';

function Join() {
  const [groupId, setGroupId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const firebase_uid = user.uid;

        const response = await axios.post('https://chat-express-zpxu.onrender.com/api/join-group',
          {
            group_id: groupId,
            firebase_uid: firebase_uid
          },
        );
        console.log('Group joined:', response.data);
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
          グループIDを入力してください
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mt-1">
            <TextField
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              aria-required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
              <Button
              variant="contained"
                type="submit"
                className=" w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
              >
                グループ参加
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
