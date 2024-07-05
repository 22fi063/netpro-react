import { Link as RouterLink } from "react-router-dom";

function Select() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <div className="flex items-center w-full p-4 bg-[#171E23]">
        <i className="fas fa-rocket text-white text-2xl"></i>
        <span className="text-white text-xl ml-2 font-roboto">
          予定共有アプリ
        </span>
      </div>
      <div className="flex flex-col items-center mt-24">
        <h2 className="text-white text-xl font-roboto mb-8">
          当てはまる方を選んでください
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg flex justify-between items-center space-x-4">
          <div className="p-8 border rounded-lg text-center w-[200px] cursor-pointer hover:shadow-xl">
            <i className="fas fa-users text-5xl"></i>
            <RouterLink to="/join" className="no-underline">
              <button className="mt-4 font-roboto">既存のチームに参加</button>
            </RouterLink>
          </div>
          <div className="p-8 border border-blue-500 rounded-lg text-center w-[200px] cursor-pointer hover:shadow-xl">
            <i className="fas fa-star text-5xl"></i>
            <RouterLink to="/create" className="no-underline">
              <button className="mt-4 font-roboto">チームを新規作成</button>
            </RouterLink>
          </div>
        </div>
        <button className="mt-8 bg-[#00B1B8] text-white px-8 py-4 rounded-full shadow-lg font-roboto hover:bg-[#009DA1]">
          次へ
        </button>
      </div>
    </div>
  );
}

export default Select;
