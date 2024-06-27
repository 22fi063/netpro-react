import React, { useState, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { username });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6">
          グループIDを入力してください
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <RouterLink to="/home" className="no-underline">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
              >
                グループ参加
              </button>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
