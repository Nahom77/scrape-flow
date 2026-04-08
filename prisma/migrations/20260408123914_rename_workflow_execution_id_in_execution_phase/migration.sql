-- Rename the column (keeps all existing data)
ALTER TABLE "ExecutionPhase"
RENAME COLUMN "worfklowExecutionId" TO "workflowExecutionId";

-- Drop old foreign key (it still references the old name)
ALTER TABLE "ExecutionPhase"
DROP CONSTRAINT "ExecutionPhase_worfklowExecutionId_fkey";

-- Recreate foreign key with correct column name
ALTER TABLE "ExecutionPhase"
ADD CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey"
FOREIGN KEY ("workflowExecutionId")
REFERENCES "WorkflowExecution"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;