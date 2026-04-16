"use client";

import { UnpublishWorkflow } from "@/actions/workflows/unpublishWorklow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow UnPublished", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        toast.loading("UnPublishing workflow ...", { id: workflowId });
        mutate(workflowId);
      }}
      disabled={isPending}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
}

export default UnpublishBtn;
