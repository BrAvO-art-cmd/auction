"use client";

import { KnockFeedProvider, KnockProvider, NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { env } from "@/src/env";

export function Header() {

    const [isVisible, setIsVisible] = useState(false);
      const notifButtonRef = useRef(null);
    const session = useSession();

    return (
        <div className="bg-gray-100 py-5">
            <div className="container flex justify-between items-center pl-20 ">
                    <div className="flex items-center gap-20">
                    <Link href="/" className="hover:underline flex items-center gap-2">
                    <Image src="/logo.png" width="100" height="100" alt="Logo" />
                    <span className="text-3xl font-bold">BidMarket</span>
                    </Link>
                <div className="flex items-center gap-12">
                    <button className="bg-gray-300 px-10 py-3 rounded-md border border-black text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
<Link href="/" className="flex items-center gap-2 font-bold text-m">
                    ALL AUCTIONS
                    </Link></button>
{session.data?.user && (<>
                                   <button className="px-10 py-3 rounded-md border border-black bg-gray-300 text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
<Link href="/items/create" className="flex items-center gap-2 font-bold text-m">
                    CREATE AUCTION
                    </Link></button>

                              <button className="px-10 py-3 rounded-md border border-black bg-gray-300 text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
<Link href="/auctions" className="flex items-center gap-2 font-bold text-m">
                    MY AUCTIONS
                    </Link></button>
                    </>
)}
                </div>
                </div>
                <div className="flex items-center gap-4">
{session.data?.user && (     <>       <NotificationIconButton
                                ref={notifButtonRef}
                                onClick={(e) => setIsVisible(!isVisible)}
                              />
                              <NotificationFeedPopover
                                buttonRef={notifButtonRef}
                                isVisible={isVisible}
                                onClose={() => setIsVisible(false)}
                                renderItem={({ item, ...props}) => (
                                    <NotificationCell {...props} item={item}>
                                <div className="rounded-xl">
                                  <Link
                                  className="text-blue-400 hover:text=blue-500"
                                  onClick={() => {
                                    setIsVisible(false);
                                  }}
                                  href={'/items/${item.data.itemId}'}
                                  >
                                     Someone outbidded you on <span className="font-bold">{item.data.itemName}
                                     </span> by ₹{(item.data.bidAmount) / 100}
                                  </Link></div>
                             </NotificationCell>     )}
                              />
                              </>
)} 
{session?.data?.user?.image && (
                   <Image 
                     src={session.data.user.image}
                     width="40"
                     height="40"
                     alt="user avatar"
                     className="rounded-full"
                     />    
)}                               
                    <div>{session?.data?.user?.name}</div>
                    <div>{ session.data?.user? (
                        <Button type="submit"
                          onClick={() =>
                            signOut({
                                callbackUrl: "/",
                            })
                          }
                        >
                            SIGN OUT
                                </Button>
                                ) : ( 
                                <Button type="submit"
                                onClick={() =>
                                    signIn()
                                }
                                >
                                    SIGN OUT
                                </Button>)}</div>
                </div>
            </div>
        </div>
    );    
}
<button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
  Sketch
</button>