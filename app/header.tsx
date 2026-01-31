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
        <div className="bg-gray-300 py-5">
            <div className="container flex justify-between items-center pl-20">
                    <div className="flex items-center gap-20">
                    <Link href="/" className="hover:underline flex items-center gap-2">
                    <Image src="/logo.png" width="80" height="80" alt="Logo" />
                    BidMarket
                    </Link>
                <div className="flex items-center gap-8">
                    <Link href="/" className="hover:underline flex items-center gap-2">
                    All Auctions
                    </Link>
{session.data?.user && (<>
                    <Link href="/items/create" className="hover:underline flex items-center gap-2">
                    Create Auction
                    </Link>

                    <Link href="/auctions" className="hover:underline flex items-center gap-2">
                    My Auctions
                    </Link></>
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
                            Sign Out
                                </Button>
                                ) : ( 
                                <Button type="submit"
                                onClick={() =>
                                    signIn()
                                }
                                >
                                    Sign In
                                </Button>)}</div>
                </div>
            </div>
        </div>
    );    
}
