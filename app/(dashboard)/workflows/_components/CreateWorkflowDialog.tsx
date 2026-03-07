"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import CustomDialogHeader from "../../../../components/CustomDialogHeader";
import { AlertCircle, Layers2Icon, Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  createWorkflowSchema,
  CreateWorkflowValues,
} from "@/schema/workflows.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  triggerText?: string;
}

function CreateWorkflowDialog({ triggerText }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowValues>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow created successfully", { id: "create-workflow" });
      console.log(data);
      router.push(`workflow/editor/${data?.data.id}`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const handleSubmit = useCallback(
    (data: CreateWorkflowValues) => {
      toast.loading("Creating workflow ...", { id: "create-workflow" });
      mutate(data);
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0 gap-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <DialogDescription className="hidden">
          Create workflow
        </DialogDescription>

        <div className="p-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FieldGroup className="gap-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="name">
                      Name <p className="text-primary text-sm">(required)</p>
                    </FieldLabel>
                    <Input {...field} id="name" type="text" />
                    <FieldDescription>
                      Choose a descriptive and unique name
                    </FieldDescription>
                    {fieldState.invalid && (
                      <span className="mx-1 flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {fieldState.error?.message}
                      </span>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="description">
                      Description{" "}
                      <p className="text-muted-foreground text-sm">
                        (optional)
                      </p>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      className="resize-none"
                    />
                    <FieldDescription>
                      Provide a brief description of what your workflow does.{" "}
                      <br /> This is optional but can help you remember the
                      workflow&rsquo;s purpose
                    </FieldDescription>
                    {fieldState.invalid && (
                      <span className="mx-1 flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {fieldState.error?.message}
                      </span>
                    )}
                  </Field>
                )}
              />
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Proceed"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
