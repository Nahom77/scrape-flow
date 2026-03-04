import z from "zod";

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 Characters")
    .max(50, "Name shouldn't exceed 50 characters"),
  description: z
    .string()
    .max(80, "Description shouldn't exceed 80 characters")
    .optional(),
});

export type CreateWorkflowValues = z.infer<typeof createWorkflowSchema>;
