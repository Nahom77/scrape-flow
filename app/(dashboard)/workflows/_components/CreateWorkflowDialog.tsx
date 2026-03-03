"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import CustomDialogHeader from "./CustomDialogHeader";
import { Layers2Icon } from "lucide-react";

interface Props {
  triggerText?: string;
}

function CreateWorkflowDialog({ triggerText }: Props) {
  const [open, setOpen] = useState(false);
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
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
