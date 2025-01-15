"use client";

import { useState, useContext } from "react";
import { DataContext } from "../context/PollData";
import { submitVote } from "../firebase/fetch";
import PollResult from "./Result";

function parseAsKST(dateStrWithoutTZ) {
    return new Date(dateStrWithoutTZ.replace(" ", "T") + ":00+09:00");
}

export default function PollPage({ poll_id }) {
    const pollData = useContext(DataContext);
    const poll = pollData?.[poll_id];
    if (!poll || !poll.title) return <div></div>;

    const [voted, setVoted] = useState(false);

    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const startDate = parseAsKST(poll.start);
    const endDate = parseAsKST(poll.end);

    if (today < startDate) return <div></div>;
    if (today > endDate) return <PollResult poll_id={poll_id} />;

    if (voted) {
        return <PollResult poll_id={poll_id} />;
    }

    const options = poll.options ? poll.options.split(";") : [];

    const handleOptionClick = async (option) => {
        let ipData = { ip: "unknown" };
        try {
            const res = await fetch("https://api.ipify.org?format=json");
            ipData = await res.json();
        } catch (err) {
            console.error("Failed to get IP address:", err);
        }

        /*const getPosition = () => new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    
        let geoInfo = null;
        try {
            const position = await getPosition();
            geoInfo = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
        } catch (err) {
            console.error("Failed to get geolocation:", err);
        }*/

        const deviceInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            devicePixelRatio: window.devicePixelRatio,
            ipAddress: ipData.ip,
        };    

        await submitVote(poll_id, option, deviceInfo);
        
        setVoted(true);
    }

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
                    onClick={() => handleOptionClick(option)}
                >
                    {option}
                </button>
            ))}
            </div>
        </div>
    );
}