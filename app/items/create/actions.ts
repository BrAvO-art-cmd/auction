"use server";

import { revalidatePath } from "next/cache";
import { database } from "../../../src/db/database";
import { items } from "../../../src/db/schema";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const user = session.user;

    if (!user || !user.id) {
        throw new Error("Unauthorized");
    }

    const startingPrice =  formData.get("startingPrice") as string;
    const imageFile = formData.get("image") as File;

    const priceAsPaise = Math.floor(parseFloat(startingPrice) * 100);
    
    let imageData = null;
    
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        imageData = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    
    
    await database.insert(items).values({
      name: formData.get("name") as string,
      startingPrice: priceAsPaise,
      userId: user.id,
      image: imageData,
    });
    redirect("/");
}
