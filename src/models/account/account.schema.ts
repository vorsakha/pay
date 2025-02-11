import { z } from "zod";

const accountSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  organizationCustomerId: z.string().optional(),
});

type AccountSchema = z.infer<typeof accountSchema>;

export { accountSchema };
export type { AccountSchema };
