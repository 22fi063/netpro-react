// import { Link as RouterLink } from 'react-router-dom';

function Calender() {
  return (
    <div className="w-full h-full bg-[#121212] p-4">
      <header className="flex items-center justify-between px-4 py-2 bg-[#191919] text-white">
        <div className="flex items-center space-x-2">
          <i className="fas fa-rocket"></i>
          <span className="font-roboto">予定共有アプリ</span>
        </div>
        <div className="flex items-center space-x-4">
          <i className="fas fa-user-circle"></i>
          <span className="font-roboto"></span>
          <i className="fas fa-bars"></i>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full mt-4">
          <thead>
            <tr className="bg-[#e0e0e0]">
              <th className="w-[60px] h-[60px] border border-[#000]"></th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/13
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/14
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/15
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/16
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/17
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/18
              </th>
              <th className="w-[60px] h-[60px] border border-[#000] font-roboto">
                7/19
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "たろう",
                availability: ["⭕", "⭕", "⭕", "⭕", "⭕", "⭕", "❌"],
              },
              {
                name: "はなこ",
                availability: ["⭕", "⭕", "⭕", "△", "△", "⭕", "❌"],
              },
              {
                name: "すみれ",
                availability: ["⭕", "❌", "❌", "❌", "❌", "⭕", "❌"],
              },
              {
                name: "あかり",
                availability: ["⭕", "❌", "❌", "❌", "❌", "❌", "⭕"],
              },
              {
                name: "ゆうか",
                availability: ["❌", "❌", "❌", "❌", "❌", "❌", "⭕"],
              },
            ].map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-[#e0e0e0]">
                <td className="w-[60px] h-[60px] border border-[#000] font-roboto">
                  {row.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calender;
