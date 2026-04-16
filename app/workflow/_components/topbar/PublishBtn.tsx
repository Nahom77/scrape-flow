"use client";

import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow Published", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        toast.loading("Publishing workflow ...", { id: workflowId });
        mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      disabled={isPending}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
}

export default PublishBtn;
