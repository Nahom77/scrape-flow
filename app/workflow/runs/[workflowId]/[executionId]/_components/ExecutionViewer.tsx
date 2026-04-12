"use client";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/getWorkflowPhaseDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DatesToDurationString } from "@/lib/helper/date";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
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
import React, { ReactNode, useState } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const { data: PhaseDetails } = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = data?.status === WorkflowExecutionStatus.RUNNING;
  const duration = DatesToDurationString(data?.completedAt, data?.startedAt);
  const creditsConsumed = GetPhasesTotalCost(data?.phases || []);

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
            value={creditsConsumed}
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
              variant={selectedPhase === phase.id ? "default" : "ghost"}
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <Badge variant={"outline"}>{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <p className="text-muted-foreground text-xs">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
      <div className="w-full h-full px-4 flex">
        {isRunning && (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <p className="font-bold">Run is in progress, please wait</p>
          </div>
        )}

        {!isRunning && !selectedPhase && (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-muted-foreground text-sm">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && PhaseDetails && (
          <div className="overflow-auto py-4 flex flex-col gap-4 container">
            <div className="flex items-center gap-2">
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex items-center gap-1">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>TODO</span>
              </Badge>
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex items-center gap-1">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {DatesToDurationString(
                    PhaseDetails.completedAt,
                    PhaseDetails.startedAt,
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              title="Inputs"
              subTitle="Inputs used for this phase"
              paramJson={PhaseDetails.inputs}
            />
          </div>
        )}
      </div>
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

function ParameterViewer({
  title,
  subTitle,
  paramJson,
}: {
  title: string;
  subTitle: string;
  paramJson: string | null;
}) {
  const params = paramJson ? JSON.parse(paramJson) : undefined;
  return (
    <Card className="overflow-hidden pt-0">
      <CardHeader className="py-4 bg-gray-50 dark:bg-background border-b rounded-lg rounded-b-none">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {subTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className="text-sm">No Parameters generated for this phase.</p>
          )}

          {params &&
            Object.entries(params).map(([key, value]) => (
              <div
                className="flex justify-between items-centeer space-y-1"
                key={key}
              >
                <p className="flex-1 text-muted-foreground text-sm basis-1/3">
                  {key}
                </p>
                <Input
                  readOnly
                  className="flex-1 basis-2/3"
                  value={value as string}
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
