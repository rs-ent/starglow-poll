import { getSheetsData } from "../scripts/google-sheets-data";
import { DataProvider } from "../context/PollData";

export default async function PollLayout({ children, params }) {
    const pollData = await getSheetsData();

    return (
        <html>
            <body>
                <DataProvider value={pollData}>
                    {children}
                </DataProvider>
            </body>
        </html>
    );
}