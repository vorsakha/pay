import { z } from "zod";

const customerSchema = z.object({
  name: z.string(),
  organizationType: z.enum(["INDIVIDUAL", "BUSINESS"]),
});

type CustomerSchema = z.infer<typeof customerSchema>;

export { customerSchema };
export type { CustomerSchema };
