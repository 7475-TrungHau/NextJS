'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RegisterBodyType, RegisterBody } from '@/SchemaValidations/auth.schema';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import evnConfig from '@/config';
import { useToast } from '@/providers/toast-provider';
import authApi from '@/apiRequest/auth';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { error, success } = useToast();
    const router = useRouter();
    const { setSessionToken } = useAppContext();
    // Tạo form
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    async function onSubmit(data: RegisterBodyType) {

        try {
            const result = await authApi.register(data);
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
            success('success', 'Đăng ký thành công.', 3000);
        } catch (err: any) {
            console.log("err: ", err);
            const { status, payload } = err;
            if (status === 422 && payload.errors) {
                payload.errors.forEach((e: { field: string, message: string }) => {
                    console.log('e: ', e);
                    form.setError(e.field as keyof RegisterBodyType, {
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

            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full rounded-lg p-6 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg '>
                <h1 className='text-3xl font-bold text-center'>Đăng ký</h1>
                <p className="text-center text-gray-500 text-sm">{evnConfig.NEXT_PUBLIC_API_ENDPOINT}</p>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Nhập name' {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Nhập email' {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => {

                        return (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder='Nhập password'
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 dark:text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 dark:text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => {

                        return (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder='Nhập lại mật khẩu'
                                            {...field}
                                        />
                                        <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700' type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        );
                    }}
                />
                <Button type='submit' className='w-full' disabled={form.formState.isSubmitting} >Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm;

