"use client";

import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/PollData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore"; 
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function PollResult({ poll_id }) {
    const [votesData, setVotesData] = useState([]);

    const pollData = useContext(DataContext);
    const poll = pollData?.[poll_id];

    if (!poll || !poll.title) return <div></div>;

    useEffect(() => {
        async function fetchVotes() {
            try {
                const pollRef = doc(db, "polls", poll_id);
                const snapshot = await getDoc(pollRef);

                if (!snapshot.exists()) {
                    console.log("No such document!");
                    return;
                }

                const poll = snapshot.data();
                if (!poll.votes) {
                    console.log("No votes found in this poll document!");
                    return;
                }

                const newData = Object.entries(poll.votes).map(([option, count]) => ({
                    name: option,
                    value: count,
                }));

                setVotesData(newData);
            } catch (err) {
                console.error("Failed to fetch votes:", err);
            }
        }
    
        fetchVotes();
    }, [poll_id]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B49FFF", "#FF4444"];

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-xl font-bold mb-4">
                {poll.title}
            </h1>

            {/* 4) Recharts PieChart */}
            <PieChart width={400} height={400}>
            <Pie
                data={votesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
            >
                {votesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </div>
    );
}