"use client";

import { GetAvailableCredits } from "@/actions/billing/getAvailableCredits";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactCountUpWrapper from "./ReactCountUpWrapper";
import { buttonVariants } from "./ui/button";

function UserAvailableCreditBadge() {
  const { data, isLoading } = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: 30 * 1000,
  });

  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full items-center space-x-2",
        buttonVariants({ variant: "outline" }),
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {isLoading && <Loader2Icon className="size-4 animate-spin" />}
        {!isLoading && data && <ReactCountUpWrapper value={data} />}
        {!isLoading && data === undefined && "-"}
      </span>
    </Link>
  );
}

export default UserAvailableCreditBadge;
