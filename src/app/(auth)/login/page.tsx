import LoginForm from '@/components/form/login-form';

const LoginPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </main>
    );
};

export default LoginPage;