"use client";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatesToDurationString } from "@/lib/helper/date";
import { WorkflowExecutionStatus } from "@/types/workflow.type";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React, { ReactNode } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const { data } = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const duration = DatesToDurationString(data?.completedAt, data?.startedAt);

  return (
    <div className="w-full h-full flex">
      <aside className="w-110 min-w-110 max-w-110 overflow-hidden flex flex-col border-r-2 border-separate grow">
        <div className="px-2 py-4">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowercase">
                {data?.startedAt
                  ? formatDistanceToNow(new Date(data.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={duration ?? <Loader2Icon className="animate-spin" />}
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={"TODO"}
          />
        </div>

        <Separator />

        <div className="px-4 py-2 flex justify-center items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="h-full overflow-auto px-2 py-4">
          {data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              variant={"ghost"}
              className="w-full justify-start"
            >
              <Badge variant={"outline"}>{index + 1}</Badge>
              <p className="font-semibold">{phase.name}</p>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default ExecutionViewer;

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value?: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="px-4 py-2 flex justify-between items-center text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 font-semibold capitalize">
        {value}
      </div>
    </div>
  );
}
