"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workflow } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow.type";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="overflow-hidden p-0 shadow-sm hover:shadow-md dark:shadow-primary/30 border rounded-lg border-separate">
      <CardContent className="h-25 p-4 flex justify-between items-center">
        <div className="flex justify-end items-center space-x-3">
          <div
            className={cn(
              "size-10 flex justify-center items-center rounded-full",
              statusColors[workflow.status as WorkflowStatus],
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="flex items-center font-bold text-muted-foreground text-base">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 rounded-full font-medium text-yellow-800 text-xs">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2",
            )}
          >
            <ShuffleIcon size={16} /> Edit
          </Link>
        </div>

        <WorkflowActions />
      </CardContent>
    </Card>
  );
}

function WorkflowActions() {
  return (
    <DropdownMenu>
      <TooltipWrapper content={"More actions"}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <MoreVerticalIcon size={18} />
          </Button>
        </DropdownMenuTrigger>
      </TooltipWrapper>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
          <TrashIcon size={16} className="stroke-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkflowCard;
