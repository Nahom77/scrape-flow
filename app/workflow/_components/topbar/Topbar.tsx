"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveBtn from "./SaveBtn";
import ExecuteBtn from "./ExecuteBtn";
import NavigationTabs from "./NavigationTabs";
import PublishBtn from "./PublishBtn";

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
}

function Topbar({ title, subtitle, workflowId, hideButtons = false }: Props) {
  const router = useRouter();
  return (
    <header className="w-full h-15 p-2 flex justify-between top-0 z-10 sticky bg-background border-b-2 border-separate">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold truncate text-ellipsis">{title}</p>
          {subtitle && (
            <p className="text-muted-foreground text-xs truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex flex-1 justify-end gap-1">
        {!hideButtons && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            <SaveBtn workflowId={workflowId} />
            <PublishBtn workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
}

export default Topbar;
