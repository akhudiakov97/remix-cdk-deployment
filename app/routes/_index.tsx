import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Newsify - Your Source for Daily News" },
    { name: "description", content: "Stay updated with the latest news across the globe." },
  ];
};

export default function Index() {
  return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Welcome to <span className="text-blue-500">Newsify</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your one-stop destination for the latest and trending news.
          </p>
        </header>

        {/* Content Section */}
        <main className="text-center space-y-6">
          <p className="text-gray-400">
            Explore curated news from around the world, stay informed, and stay ahead.
          </p>
          <a
              href="/news"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Go to News
          </a>
        </main>

        {/* Footer Section */}
        <footer className="mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Newsify. All rights reserved.</p>
        </footer>
      </div>
  );
}