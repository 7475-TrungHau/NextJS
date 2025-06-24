import LoginForm from '@/components/form/login-form';

const LoginPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <LoginForm />
            </div>
        </main>
    );
};

export default LoginPage;