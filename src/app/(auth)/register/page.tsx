'use client';

import RegisterForm from '@/components/form/register-form';

const RegisterPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </main>
    );
};

export default RegisterPage;