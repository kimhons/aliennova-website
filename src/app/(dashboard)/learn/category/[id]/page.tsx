import { getArticlesByCategory } from '@/config/learn-content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLE_CATEGORIES } from '@/config/learn-content';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = ARTICLE_CATEGORIES.find(cat => cat.id === params.id);
  const articles = getArticlesByCategory(params.id);
  
  if (!category || articles.length === 0) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center text-sm mb-4">
            <Link href="/learn" className="text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Learn Hub
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">{category.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.readTime} min read
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {article.publishedAt}
                  </span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
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
  );
}
