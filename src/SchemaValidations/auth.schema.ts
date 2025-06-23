import { z } from "zod";

export const RegisterBody = z.object({
    name: z.string().trim().min(2, { message: 'name phải ít nhất 2 ký tự' }).max(256, { message: 'name phải nhiều nhất 256 ký tự' }),
    email: z.string().trim().email('email không hợp lệ'),
    password: z.string().trim().min(6, { message: 'password phải ít nhất 6 ký tự' }).max(100, { message: 'password phải nhiều nhất 100 ký tự' }),
    confirmPassword: z.string().trim().min(6, { message: 'confirmPassword phải ít nhất 6 ký tự' }).max(100, { message: 'confirmPassword phải nhiều nhất 100 ký tự' }),
}).strict()
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'password và confirmPassword không khớp',
                path: ['confirmPassword']
            })
        }
    })

export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    }),
    message: z.string()
})

export type RegisterResType = z.infer<typeof RegisterRes>;

export const LoginBody = z.object({
    email: z.string().trim().email('email không hợp lệ'),
    password: z.string().trim().min(6, { message: 'password phải ít nhất 6 ký tự' }).max(100, { message: 'password phải nhiều nhất 100 ký tự' }),
}).strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export type LoginResType = z.infer<typeof RegisterRes>;
