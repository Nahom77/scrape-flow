import { LucideProps } from "lucide-react";
import React from "react";
import { TaskParam, TaskType } from "./tast.type";
import { AppNode } from "./app-node.type";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface Workflow {
  id: string;
}

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: AppNode[];
};
