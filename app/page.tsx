import { Input } from "../src/components/ui/input"
import { Button } from "../src/components/ui/button";
import { database } from "../src/db/database";
import { bids as bidsSchema, items } from "../src/db/schema";
import { revalidatePath } from "next/cache";
import SignIn from "@/src/components/sign-in";
import { SignOut } from "@/src/components/sign-out";
import { auth } from "@/src/auth";
import  Link  from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  return (
    <main className="mx-auto py-12 space-y-4 container">
      <h1 className="text-4xl font-bold">
        Items For Sale
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl overflow-hidden bg-gray-50"> 
            {item.image && (
              <div className="w-full h-40 mb-3 relative">
                <Image src={item.image} alt={item.name} width={200} height={200} className="w-full h-full object-cover rounded" />
              </div>
            )}
            
              <h2 className="font-semibold">{item.name}</h2>
              <h3 className="text-sm text-gray-600">Base Price: ₹{item.startingPrice / 100}</h3>
              
              <Button asChild>
                <Link href={`/items/${item.id}/`}>Place Bid</Link>
              </Button>
          </div>
        ))}
      </div>
    </main>
  );
}

