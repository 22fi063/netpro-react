import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Select() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-4">
       当てはまる方を選んでください
      </h1>
      <RouterLink to="/join" className="no-underline">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700">
          既存のグループに参加
        </button>
      </RouterLink>
      <RouterLink to="/create" className="no-underline">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700">
          グループの新規作成
        </button>
      </RouterLink>
    </div>
  );
}

export default Select;