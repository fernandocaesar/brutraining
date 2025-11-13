
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ArticlePage } from './components/ArticlePage'; 
import { CoursesPage } from './components/CoursesPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { AdminPage } from './components/AdminPage';
import { AnamnesisChatPage } from './components/AnamnesisChatPage';
import { 
    SITE_NAME, 
    NAV_LINKS, 
    CONTACT_PHONE_DISPLAY, 
    CONTACT_EMAIL, 
    PhoneIcon, 
    WhatsAppIcon, 
    WHATSAPP_LINK, 
    SITE_SLOGAN,
    SITE_LOGO_URL 
} from './constants';
import { ChevronRightIcon } from './constants'; 

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinkClasses = (path: string) => 
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      location.pathname === path || (path === "/blog" && location.pathname.startsWith("/blog/")) || (path === "/anamnese" && location.pathname.startsWith("/anamnese"))
        ? 'bg-amber-500 text-slate-900' 
        : 'text-slate-100 hover:bg-indigo-700 hover:text-white'
    }`;

  return (
    <nav className="bg-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={SITE_LOGO_URL} alt={`${SITE_NAME} Logo`} className="h-10 md:h-12 w-auto group-hover:opacity-90 transition-opacity" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-indigo-200 hidden md:block group-hover:text-amber-300 transition-colors">
                  {SITE_SLOGAN}
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} to={link.href} className={navLinkClasses(link.href)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-200 hover:text-white focus:outline-none"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <Link to="/" className="block px-3 py-2 text-xs text-indigo-300" onClick={() => setIsMenuOpen(false)}>
                {SITE_SLOGAN}
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href || (link.href === "/blog" && location.pathname.startsWith("/blog/")) || (link.href === "/anamnese" && location.pathname.startsWith("/anamnese"))
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-200 hover:bg-indigo-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="container mx-auto text-center">
        <Link to="/" className="inline-block mb-4">
            <img src={SITE_LOGO_URL} alt={`${SITE_NAME} Logo`} className="h-12 mx-auto hover:opacity-90 transition-opacity" />
        </Link>
        <p className="mb-6 text-sm text-indigo-300">{SITE_SLOGAN}</p>
        <div className="mb-6 space-y-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-amber-400 transition-colors duration-200">
                <WhatsAppIcon className="w-5 h-5 mr-2" /> {CONTACT_PHONE_DISPLAY} (WhatsApp)
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center hover:text-amber-400 transition-colors duration-200">
                 {CONTACT_EMAIL}
            </a>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-amber-400 transition-colors duration-200">Política de Privacidade</a>
          <a href="#" className="hover:text-amber-400 transition-colors duration-200">Termos de Serviço</a>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://www.instagram.com/bruna_arrruda/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-200">
            Instagram
          </a>
          {/* Add other social media links here if available */}
        </div>
         <p className="text-sm">&copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.</p>
         <p className="text-xs mt-1">Desenvolvido com <span className="text-red-500">&hearts;</span> por <a href="https://ubie.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">ubie.com.br</a></p>
      </div>
    </footer>
  );
};


const App: React.FC = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/anamnese';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} /> 
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/curso/:courseId" element={<CourseDetailPage />} />
          <Route path="/curso/:courseId/:mode" element={<CourseDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/anamnese" element={<AnamnesisChatPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
