import { getSheetsData } from "./scripts/google-sheets-data";
import PollList from "./PollList";

export default async function Home() {
  const pollData = await getSheetsData();
  
  return (
    <PollList pollData={pollData} />
  )  
}