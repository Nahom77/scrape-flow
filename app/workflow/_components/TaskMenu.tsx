"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/tast.type";

function TaskMenu() {
  return (
    <aside className="w-85 min-w-85 max-w-85 h-full overflow-auto p-2 px-4 border-r-2 border-separate">
      <Accordion
        type={"multiple"}
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent>
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default TaskMenu;

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  return (
    <Button
      variant={"secondary"}
      className="w-full flex justify-between gap-2 border"
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}
