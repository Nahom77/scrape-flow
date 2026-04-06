"use client";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { WorkflowExecutionStatus } from "@/types/workflow.type";
import { useQuery } from "@tanstack/react-query";
import { CircleDashedIcon, LucideIcon } from "lucide-react";
import React from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const { data } = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });
  return (
    <div className="w-full h-full flex">
      <aside className="w-110 min-w-110 max-w-110 overflow-hidden flex flex-col border-r-2 border-separate grow">
        <div className="px-2 py-4">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={data?.status}
          />
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
  label: string;
  value?: string;
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
