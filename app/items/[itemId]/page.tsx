import { database } from "../../../src/db/database";
import { items } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../../src/components/ui/button";
import  Link  from "next/link";
import Image from "next/image";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

function formatTimestamp(timestamp: Date) {
    return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
    params,
    }: {
        params: Promise<{ itemId: string }>;
    }) {
    
        const { itemId } = await params;
        const item = await database.query.items.findFirst({

        where: eq(items.id, parseInt(itemId)),
    });
    if (!item) {
        return(
            <div className="space-y-8 flex flex-col items-center mt-50 justify-center">
                <Image src="/package.svg" alt="Item Not Found" width={200} height={200} />
                <h1 className="text-4xl font-bold">Item Not Found</h1>
                <p className="text-center">
                    The item you&apos;re looking for does not exist.<br/>Please check the URL or 
                    return to the homepage.
                </p>
                <Button asChild>
                    <Link href="/">Go to Homepage</Link>
                </Button>
            </div>
        );
    }
    //const bids = [
    //    {
      //  id: 1,
        //amount: 5000,
        //userName: "Alice",
        //timestamp: new Date(),
        //},
        //{
        //id: 2,
        //amount: 7000,
        //userName: "Bob",
        //timestamp: new Date(),
        //},
        //{
        //id: 3,
        //amount: 9000,
       //userName: "Charlie",
        //timestamp: new Date(),
       //},
    //];
    const bids = [];

    const hasBids = bids.length > 0;

    return (
        <main className="container mx-auto py-12 space-y-8">
            <div className="flex gap-8">
            <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold"><span className="font-normal">Auction for</span> {item.name}</h1>
            {item.image && (
              <div>
                <Image src={item.image} alt="Package" width={400} height={400} className="rounded-xl"/>
              </div>
            )}
            <div className="text-xl space-y-2">
                <div>Starting Price of <span className="font-bold">₹{Math.floor(item.startingPrice / 100).toFixed(2)}</span></div>
                <div>Bid Interval <span className="font-bold">₹{Math.floor(item.bidInterval / 100).toFixed(2)}</span></div>
            </div>
        </div>
        <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-bold">
                Current Bids
            </h2>
             
            {hasBids ? (
                <ul className="space-y-4">
                    {bids.map((bid) => (
                        <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                            <div className="flex gap-4">
                                <div>
                                <span className="font-bold">₹{bid.amount}</span> by{" "}
                                <span className="font-bold">{bid.userName}</span> 
                                </div>
                                <div className="">{formatTimestamp(bid.timestamp)}</div> 
                            </div>
                        </li>
                    ))}
                </ul>
            ):(
                <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                    <Image src="/package.svg" alt="No bids yet" width={200} height={200} />
                    <h2 className="text-2xl font-bold">No bids yet</h2>
                    <Button>Place a Bid</Button>
                    </div>   
            )}
            </div>
        </div>
        </main>
    );
}
