"use client";

import { UpdateWorkflow } from "@/actions/workflows/updateworkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Wokflow saved successfully", { id: "workflow update" });
    },
    onError: () => {
      toast.error("Failed to save", { id: "workflow update" });
    },
  });

  const handleSave = () => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading("Saving workflow...", { id: "workflow update" });

    mutate({
      id: workflowId,
      definition: workflowDefinition,
    });
  };

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={handleSave}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}

export default SaveBtn;
