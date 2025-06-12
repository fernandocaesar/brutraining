
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { blogArticles, sectionVariants, itemVariantsStagger, ChevronRightIcon } from '../constants';
import { BlogArticle } from '../types';

const BlogPostCard: React.FC<{ article: BlogArticle, index: number }> = ({ article, index }) => {
  return (
    <motion.div
      variants={itemVariantsStagger(index)}
      id={article.slug} // Keep ID for potential direct anchor linking if needed elsewhere
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
    >
      <Link to={`/blog/${article.slug}`} className="block hover:opacity-90 transition-opacity">
        <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-3">
            <span className="text-sm text-amber-600 font-semibold uppercase">{article.category}</span>
            <span className="text-sm text-slate-500 mx-2">&#8226;</span>
            <span className="text-sm text-slate-500">{article.date}</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">
            <Link to={`/blog/${article.slug}`} className="text-indigo-800 hover:text-indigo-600 transition-colors duration-200">
                {article.title}
            </Link>
        </h3>
        <p className="text-slate-700 mb-6 flex-grow leading-relaxed">{article.description}</p>
        <Link to={`/blog/${article.slug}`} className="text-indigo-600 hover:text-amber-600 font-semibold transition-colors duration-200 self-start inline-flex items-center group">
          Continuar Lendo <ChevronRightIcon className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export const BlogPage: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Scroll to top when the main BlogPage is loaded (not an individual article page)
    // Individual article pages will have their own scroll-to-top logic if needed.
    if (location.pathname === '/blog' && !location.hash) {
        window.scrollTo(0,0);
    }
  }, [location.pathname, location.hash]);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-12 md:py-20 bg-slate-100 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-indigo-800">
          Blog de Bruna Arruda
        </h1>
        <p className="text-xl text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          Dicas, insights e inspiração para sua jornada de transformação física e mental.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogArticles.map((article, index) => (
            <BlogPostCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};