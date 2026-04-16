"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function RunBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow started", { id: workflowId });
      router.push(data.path);
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      disabled={isPending}
      onClick={() => {
        toast.loading("Scheduling run ...", { id: workflowId });
        mutate({ workflowId });
      }}
    >
      <PlayIcon size={16} />
    </Button>
  );
}

export default RunBtn;
