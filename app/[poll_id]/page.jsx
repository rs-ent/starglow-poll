import PollPage from "./poll";

export default async function PollHome({ params }) {
    const { poll_id } = await params;
    return (
        <PollPage poll_id={poll_id} />
    )
};