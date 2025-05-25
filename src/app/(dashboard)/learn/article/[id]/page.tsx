import { getArticleById } from '@/config/learn-content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLE_CATEGORIES } from '@/config/learn-content';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleById(params.id);
  
  if (!article) {
    notFound();
  }
  
  const category = ARTICLE_CATEGORIES.find(cat => cat.id === article.category);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/learn" className="text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Learn Hub
            </Link>
            <span className="mx-2">›</span>
            <Link 
              href={`/learn/category/${article.category}`} 
              className="text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {category?.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600 dark:text-gray-400">{article.title}</span>
          </div>
          
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                {category?.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                {article.readTime} min read
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                {article.publishedAt}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                By {article.author}
              </span>
            </div>
            
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-blue max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
          
          {/* Article Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/learn" 
              className="inline-flex items-center text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Learn Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
