import PollPage from "./Poll";
import PollResult from "./Result";

export default async function PollHome({ params }) {
    const { poll_id } = await params;
    return (
        <>
        <PollPage poll_id={poll_id} />
        </>
    )
};