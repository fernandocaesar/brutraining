
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogArticles, sectionVariants, itemVariants, ArrowLeftIcon } from '../constants';
import { BlogArticle } from '../types';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(art => art.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    // Or a dedicated 404 component
    return <Navigate to="/blog" replace />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-12 md:py-20 bg-slate-50 min-h-screen"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div variants={itemVariants} className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-indigo-600 hover:text-amber-600 font-semibold transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar ao Blog
          </Link>
        </motion.div>

        <motion.article variants={itemVariants}>
          <header className="mb-8">
            <div className="mb-4">
              <span className="text-amber-600 font-semibold uppercase text-sm tracking-wider">{article.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-slate-500 text-md">
              Por <span className="font-semibold text-indigo-700">{article.author}</span> | Publicado em {article.date}
            </p>
          </header>

          <motion.img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl mb-10"
            variants={itemVariants}
          />
          
          {/* Apply Tailwind typography for prose styling */}
          <div 
            className="prose prose-indigo lg:prose-xl max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </motion.article>

        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-slate-200">
           <Link 
            to="/blog" 
            className="inline-flex items-center text-indigo-600 hover:text-amber-600 font-semibold transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
            Ver todos os posts
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};