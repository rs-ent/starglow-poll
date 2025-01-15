'use client';

import { useRouter } from "next/navigation";

export default function PollList({pollData}) {
    
    const router = useRouter();
    const handleRowClick = (pollId) => {
        router.push(`/${pollId}`);
    };

    return (
        <div className="relative p-4">
            <h1 className="text-2xl font-bold mb-4">Google Sheets Data</h1>

            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[rgba(255,255,255,0.1)] border-b">
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
                    <tr
                        key={pollId}
                        className="border-b hover:bg-[rgba(255,255,255,0.1)]"
                        onClick={() => handleRowClick(pollId)}
                    >
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
};