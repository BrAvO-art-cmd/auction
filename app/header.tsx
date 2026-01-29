import { auth } from "@/src/auth";
import SignIn from "@/src/components/sign-in";
import { SignOut } from "@/src/components/sign-out";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
    const session = await auth();

    return (
        <div className="bg-gray-300 py-5">
            <div className="container flex justify-between items-center pl-20">
                    <div className="flex items-center gap-20">
                    <Link href="/" className="hover:underline flex items-center gap-2">
                    <Image src="/logo.png" width="80" height="80" alt="Logo" />
                    BidMarket
                    </Link>
                <div>
                    <Link href="/items/create" className="hover:underline flex items-center gap-2">
                    Auction an Item
                    </Link>
                </div>
                </div>
                <div className="flex items-center gap-4">
                                   
                    <div>{session?.user?.name}</div>
                    <div>{session ? <SignOut /> : <SignIn />}</div>
                </div>
            </div>
        </div>
    );    
}
