import { useLoaderData } from "@remix-run/react";

type Article = {
    source: {
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
};

type LoaderData = {
    articles: Article[];
    error?: string;
};

export async function loader(): Promise<LoaderData> {
    const API_KEY = "2f51b119b4ea4c7ea40e453d3748c17f";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return { articles: data.articles || [] };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { articles: [], error: "Failed to load news" };
    }
}

export default function News() {
    const { articles, error } = useLoaderData<LoaderData>();

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <header className="bg-gray-800 p-4">
                <h1 className="text-3xl font-bold text-center">Latest US News</h1>
            </header>
            <main className="p-6 space-y-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!error && articles.length === 0 && (
                    <p className="text-gray-400 text-center">No news available at the moment.</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4"
                        >
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="rounded-lg object-cover h-40 w-full"
                                />
                            )}
                            <div className="flex flex-col space-y-2">
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p className="text-gray-400 text-sm">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-300"
                                >
                                    Read more
                                </a>
                            </div>
                            <div className="text-gray-500 text-xs">
                                {article.source.name} -{" "}
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-gray-800 text-center p-4">
                <p className="text-gray-500">&copy; 2024 Latest US News</p>
            </footer>
        </div>
    );
}