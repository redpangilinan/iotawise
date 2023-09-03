import * as z from "zod"

export const activityPatchSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().max(128).optional(),
  colorCode: z.string(),
})
