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
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}

      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          "use server";

          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
