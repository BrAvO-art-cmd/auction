import { Input } from "../src/components/ui/input"
import { Button } from "../src/components/ui/button";
import { database } from "../src/db/database";
import { bids as bidsSchema, items } from "../src/db/schema";
import { revalidatePath } from "next/cache";
import SignIn from "@/src/components/sign-in";
import { SignOut } from "@/src/components/sign-out";
import { auth } from "@/src/auth";

export default async function HomePage() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-4xl font-bold">
        Items For Sale
      </h1>

      <div className="grid grid-cols-6 gap-4">
        {allItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl">
            {item.name}
            Base Price: ₹{item.startingPrice / 100} 
            </div>
        ))}
      </div>
    </main>
  );
}
