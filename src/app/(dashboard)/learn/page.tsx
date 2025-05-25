import { ARTICLE_CATEGORIES, getAllArticles } from '@/config/learn-content';
import Link from 'next/link';
import Image from 'next/image';

export default function LearnPage() {
  const articles = getAllArticles();
  const featuredArticle = articles[0]; // Using the first article as featured
  const recentArticles = articles.slice(1, 4); // Next 3 articles as recent
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">Learn Hub</h1>
        
        {/* Featured Article */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Featured Article</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative h-60 md:h-auto">
                <Image 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                    {ARTICLE_CATEGORIES.find(cat => cat.id === featuredArticle.category)?.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {featuredArticle.readTime} min read
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {featuredArticle.excerpt}
                </p>
                <Link 
                  href={`/learn/article/${featuredArticle.id}`}
                  className="text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ARTICLE_CATEGORIES.map(category => (
              <Link 
                key={category.id}
                href={`/learn/category/${category.id}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Recent Articles */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map(article => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={article.imageUrl} 
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                      {ARTICLE_CATEGORIES.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link 
                    href={`/learn/article/${article.id}`}
                    className="text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
