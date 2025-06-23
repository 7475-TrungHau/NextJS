// Removed duplicate Home function


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-8 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Chào mừng đến với Trang chủ!</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Chào mừng đến với Trang chủ!
        </button>

      </div>
    </main>
  );
}

