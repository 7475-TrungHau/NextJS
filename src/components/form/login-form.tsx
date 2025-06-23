'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { LoginBodyType, LoginBody } from '@/SchemaValidations/auth.schema';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/providers/toast-provider';
import { useAppContext } from '@/providers/app-provider';
import authApi from '@/apiRequest/auth';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const { success, error } = useToast();
    const { setSessionToken } = useAppContext();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: LoginBodyType) {
        try {
           const result = await authApi.login (data);
           console.log('result', result);
            if (result){
                const resultFromNextServer = await authApi.auth({ sessionToken: result.payload.data.token});
                if(resultFromNextServer.status === 201){
                    
                    setSessionToken(result.payload.data.token);
                    router.push('/me');
                }else{
                    error('Error', "set cookies thất bại");
                }
            }
            success('success', 'Chào mừng bạn đã quay lại.', 3000);
        } catch (err: any) {
            const { status, payload } = err;
            if (status === 422 && payload.errors) {
                const errors = payload.errors as { field: string; message: string }[];
                errors.forEach((e) => {
                    form.setError(e.field as keyof LoginBodyType, {
                        type: 'server',
                        message: e.message,
                    });
                    error('Error', e.message);
                });
            } else {
                error('Error', payload?.message || 'Đã có lỗi xảy ra!', 3000);
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full rounded-xl p-6 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                    Đăng nhập
                </h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nhập email của bạn"
                                    className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu"
                                        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;