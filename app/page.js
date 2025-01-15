"use client"; // 만약 페이지가 클라이언트 컴포넌트여야 한다면 추가하세요. (폼이나 인터랙션이 없으면 빼도 됩니다.)

import { getSheetsData } from "./scripts/google-sheets-data";

export default async function Home() {
  const pollData = await getSheetsData();
  console.log(pollData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Google Sheets Data</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 border-r">Poll ID</th>
              <th className="p-2 border-r">Title</th>
              <th className="p-2 border-r">Options</th>
              <th className="p-2 border-r">Start</th>
              <th className="p-2">End</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pollData).map(([pollId, info]) => (
              <tr key={pollId} className="border-b hover:bg-gray-50">
                <td className="p-2 border-r">{pollId}</td>
                <td className="p-2 border-r">{info.title}</td>
                <td className="p-2 border-r">{info.options}</td>
                <td className="p-2 border-r">{info.start}</td>
                <td className="p-2">{info.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}