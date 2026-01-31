"use client";

import { env } from "@/src/env";
import {
  KnockFeedProvider,
  KnockProvider,
} from "@knocklabs/react";

import { useSession } from "next-auth/react"
import { ReactNode } from "react";

export function Providers({children}: { children: ReactNode }) {
  const session = useSession();

  return (
    <KnockProvider apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={session.data?.user?.id ?? ""}>
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};