"use client";

import { useContext } from "react";
import { DataContext } from "../context/PollData";

function parseAsKST(dateStrWithoutTZ) {
    return new Date(dateStrWithoutTZ.replace(" ", "T") + ":00+09:00");
}

export default function PollPage({ poll_id }) {
    const pollData = useContext(DataContext);

    const poll = pollData?.[poll_id];

    if (!poll || !poll.title || poll.title === '') {
        return <div></div>;
    }

    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const startDate = parseAsKST(poll.start);
    const endDate = parseAsKST(poll.end);

    if (!poll || today < startDate || today > endDate) {
        return <div></div>;
    }

    const options = poll.options ? poll.options.split(";") : [];

    return (
        <div className="relative p-4">
            <h1 className="text-xl text-gradient text-center">
                {poll.title || ""}
            </h1>

            <div className="grid grid-cols-1 gap-3">
            {options.map((option, idx) => (
                <button
                    key={idx}
                    className="p-2 rounded-full border bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.9)] hover:text-[rgba(0,0,0,1)] transition-all"
                >
                    {option}
                </button>
            ))}
            </div>
        </div>
    );
}