-- Rename table (preserves all data)
ALTER TABLE "WorfklowExecution" RENAME TO "WorkflowExecution";

-- Rename foreign key constraints (optional but clean)
ALTER TABLE "WorkflowExecution"
RENAME CONSTRAINT "WorfklowExecution_workflowId_fkey" TO "WorkflowExecution_workflowId_fkey";

ALTER TABLE "WorkflowExecution"
RENAME CONSTRAINT "WorfklowExecution_userId_fkey" TO "WorkflowExecution_userId_fkey";

-- Fix foreign key in ExecutionPhase
ALTER TABLE "ExecutionPhase"
DROP CONSTRAINT "ExecutionPhase_worfklowExecutionId_fkey";

ALTER TABLE "ExecutionPhase"
ADD CONSTRAINT "ExecutionPhase_worfklowExecutionId_fkey"
FOREIGN KEY ("worfklowExecutionId")
REFERENCES "WorkflowExecution"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;