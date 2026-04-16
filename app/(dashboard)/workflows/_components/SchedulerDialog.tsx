"use client";

import { UpdateWorkflowCron } from "@/actions/workflows/updateWorkflowCron";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import { cn } from "@/lib/utils";
import CronExpressionParser from "cron-parser";
import { RemoveWorkflowCron } from "@/actions/workflows/removeWorkflowCron";

function SchedulerDialog(props: { workflowId: string; cron: string | null }) {
  const [cron, setCron] = useState(props.cron || "");
  let readableCron = "";
  let validCron = false;

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });
  const removeCronMutation = useMutation({
    mutationFn: RemoveWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  try {
    CronExpressionParser.parse(cron);
    readableCron = cronstrue.toString(cron);
    validCron = true;
  } catch {
    validCron = false;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="h-auto p-0 text-sm">
          {props.cron ? (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableCron}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-yellow-600">
              <TriangleAlert className="size-3" />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className=" ">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          <div
            className={cn(
              "p-4 bg-accent border border-destructive rounded-md text-destructive text-sm",
              validCron &&
                "border-primary text-primary font-semibold bg-accent/40",
            )}
          >
            {validCron ? readableCron : "Not a valid cron expression"}
          </div>

          {validCron && props.cron && (
            <DialogClose asChild className="w-full">
              <Button
                className="border-destructive text-destructive"
                variant={"outline"}
                onClick={() => {
                  toast.loading("Removing schedule", { id: "cron" });
                  removeCronMutation.mutate(props.workflowId);
                }}
                disabled={mutation.isPending || removeCronMutation.isPending}
              >
                Remove current schedule
              </Button>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 flex sm:flex-col gap-2">
          <DialogClose asChild>
            <Button
              className=""
              variant={"outline"}
              onClick={() => {
                setCron(props.cron || "");
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                toast.loading("Saving", { id: "cron" });

                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
              disabled={mutation.isPending || !validCron}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulerDialog;
