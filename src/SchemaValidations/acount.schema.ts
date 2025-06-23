import { z } from "zod";

export const AccountRes = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }),
  message: z.string()  
}).strict();

export type AccountResType = z.infer<typeof AccountRes>;

export const updateMeBody = z.object({
    name: z.string().trim().min(2, { message: 'name phải ít nhất 2 ký tự' }).max(256, { message: 'name phải nhiều nhất 256 ký tự' }),
});

export type UpdateMeBodyType = z.infer<typeof updateMeBody>;

