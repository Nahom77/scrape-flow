"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CustomDialogHeader from "./CustomDialogHeader";
import { Layers2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { createWorkflowSchema, WorkflowType } from "@/schema/workflows";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  triggerText?: string;
}

function CreateWorkflowDialog({ triggerText }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<WorkflowType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <DialogDescription className="hidden">
          Create workflow
        </DialogDescription>

        <div className="p-6"></div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
