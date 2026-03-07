"use client";

import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
}

function DeleteWorkflowDialog({ open, setOpen, workflowName }: Props) {
  const [confirmText, setConfirmText] = useState("");
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col justify-center items-center place-items-center! text-center">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDescription className="text-center">
            If you delete this workflow, you will not be able to recover it.
            <div className="w-full py-4 flex flex-col justify-center items-center gap-2">
              <p className="">
                If you are sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="border-[0.5px] border-primary/30"
              />
            </div>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            disabled={workflowName !== confirmText}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
