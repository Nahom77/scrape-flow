"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

function CustomDialogHeader(props: Props) {
  return (
    <DialogHeader className="py-0">
      <DialogTitle asChild>
        <div className="mb-2 flex flex-col items-center gap-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn("stroke-primary", props.iconClassName)}
            />
          )}
          {props.title && (
            <p className={cn("text-primary text-xl", props.titleClassName)}>
              {props.title}
            </p>
          )}
          {props.subTitle && (
            <p
              className={cn(
                "text-muted-foreground text-sm",
                props.subtitleClassName,
              )}
            >
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}

export default CustomDialogHeader;
