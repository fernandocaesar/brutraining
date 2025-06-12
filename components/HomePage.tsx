
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    faqs, 
    blogArticles, 
    testimonials, 
    mentorshipPlans, 
    sectionVariants, 
    itemVariants, 
    itemVariantsStagger, 
    brunaBio, 
    problemCards, 
    solutionCards, 
    SITE_NAME, 
    SITE_SLOGAN,
    ChevronRightIcon,
    brunaHeroImageUrl, 
    brunaAboutImageUrl, 
    onlineCoachingImageUrl, 
    clientResultImages,
    CONTACT_EMAIL,
    WHATSAPP_LINK,
    CONTACT_PHONE_DISPLAY,
    CONTACT_PHONE_NUMBER,
    WhatsAppIcon,
    PhoneIcon
} from '../constants';
import { generateSimpleTip } from '../services/geminiService';
import { FAQItem, Testimonial, MentoriaPlan, ClientResultImage } from '../types';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, staggerChildren?: boolean, id?: string}> = ({ children, className, staggerChildren, id }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {staggerChildren ? 
        React.Children.map(children, (child, index) => 
          React.isValidElement(child) ? 
          <motion.div variants={itemVariantsStagger(index)}>{child}</motion.div> : child
        ) 
        : children
      }
    </motion.section>
  );
};

const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center text-white p-4 bg-slate-800">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-40" 
      style={{ backgroundImage: `url('${brunaHeroImageUrl}')` }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-800/60 to-pink-700/50 z-0"></div>
    <motion.div
      className="text-center relative z-10 max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
        {SITE_SLOGAN}
      </h1>
      <p className="text-xl md:text-2xl mb-10 font-light drop-shadow-md max-w-2xl mx-auto">
        Descubra o caminho para o emagrecimento definitivo e sinta-se plena e confiante. Seu corpo é seu templo, e juntas vamos honrá-lo.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/anamnese"
          className="bg-amber-500 text-slate-900 font-bold py-4 px-10 rounded-full text-xl uppercase shadow-xl hover:bg-amber-400 transform transition-all duration-300 inline-flex items-center group"
        >
          INICIE SUA TRANSFORMAÇÃO
          <ChevronRightIcon className="w-6 h-6 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

const ProblemSolvedSection: React.FC = () => (
  <AnimatedSection id="desafios" className="py-16 md:py-24 bg-slate-100 px-4">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-indigo-800">Você se reconhece em algum desses desafios?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problemCards.map((card, index) => (
          <motion.div 
            key={index} 
            variants={itemVariantsStagger(index)}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center"
          >
            <card.Icon className={`w-16 h-16 mb-6 ${card.iconColor}`} />
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">{card.title}</h3>
            <p className="text-slate-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const SolutionSection: React.FC = () => (
  <AnimatedSection id="solucao" className="py-16 md:py-24 bg-indigo-800 text-white px-4">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">A Transformação que Você Merece Está Aqui</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutionCards.map((card, index) => (
          <motion.div 
            key={index}
            variants={itemVariantsStagger(index)}
            className="p-8 rounded-xl bg-indigo-700 shadow-lg hover:bg-indigo-600 transition-colors duration-300 flex flex-col" 
          >
            {card.imageUrl && (
              <div className="mb-6 rounded-lg overflow-hidden shadow-md aspect-[2/3]">
                <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-2xl font-bold mb-3 text-amber-400">{card.title}</h3>
            <p className="text-indigo-100 flex-grow">{card.description}</p> 
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const AboutBrunaSection: React.FC = () => (
  <AnimatedSection id="sobre" className="py-16 md:py-24 bg-white px-4">
    <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
      <motion.div variants={itemVariants} className="md:w-1/2 flex justify-center">
        <img
          src={brunaAboutImageUrl} 
          alt={`Foto de ${SITE_NAME} - Mentora Fitness e Especialista em Emagrecimento Definitivo`}
          className="w-full max-w-sm md:max-w-md h-auto md:h-[500px] rounded-xl shadow-2xl object-cover" 
        />
      </motion.div>
      <motion.div variants={itemVariants} className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-800">{brunaBio.greeting}</h2>
        <p className="text-xl text-amber-600 font-semibold mb-6">{SITE_SLOGAN}</p>
        
        <p className="text-lg text-slate-700 mb-4 leading-relaxed">
          {brunaBio.mission}
        </p>
        <p className="text-lg text-slate-700 mb-4 leading-relaxed">
          {brunaBio.philosophy}
        </p>
        <p className="text-lg text-slate-700 mb-6 leading-relaxed">
          {brunaBio.experienceSummary}
        </p>

        <div className="mb-6">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Formação e Expertise:</h3>
            <ul className="list-disc list-inside text-slate-700 space-y-1 pl-4">
                {brunaBio.educationAndSpecializations.map((item, index) => (
                    <li key={index} className="text-md">{item}</li>
                ))}
            </ul>
        </div>
         <p className="text-lg text-slate-700 mb-8 leading-relaxed font-semibold">
            {brunaBio.callToAction}
        </p>
        
        <div 
          className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start"
        >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block" 
        >
          <Link
            to="/anamnese"
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg uppercase shadow-md hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center justify-center group"
          >
            Iniciar Avaliação com IA
            <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
        </div>
      </motion.div>
    </div>
  </AnimatedSection>
);

const OnlineCoachingPreviewSection: React.FC = () => (
  <AnimatedSection id="aulas-online" className="py-16 md:py-24 bg-slate-100 px-4">
    <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
      <motion.div variants={itemVariants} className="md:w-1/2 flex justify-center">
        <img
          src={onlineCoachingImageUrl}
          alt="Mulher praticando exercício em casa durante aula online com Bruna Arruda"
          className="w-full max-w-lg rounded-xl shadow-2xl object-cover"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-800">Treine de Onde Estiver: Aulas Online Dinâmicas</h2>
        <p className="text-lg text-slate-700 mb-4 leading-relaxed">
          Com a mentoria da Bruna, a distância não é uma barreira. Participe de aulas online ao vivo, interativas e adaptadas para o seu espaço e seus objetivos.
        </p>
        <p className="text-lg text-slate-700 mb-6 leading-relaxed">
          Receba o mesmo acompanhamento de perto, com correções em tempo real e a energia contagiante da Bruna, tudo no conforto da sua casa. Flexibilidade e resultados andam juntos!
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-4"
        >
          <Link
            to="/#planos" 
            className="bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-full text-lg uppercase shadow-md hover:bg-amber-400 transition-colors duration-300 inline-flex items-center justify-center group"
          >
            Conheça os Planos
            <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </AnimatedSection>
);


const TestimonialsSection: React.FC = () => (
  <AnimatedSection id="depoimentos" className="py-16 md:py-24 bg-white px-4"> 
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-indigo-800">Elas Redescobriram Seu Poder Pessoal</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <motion.div 
            key={index}
            variants={itemVariantsStagger(index)}
            className="bg-slate-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300" 
          >
            <img src={testimonial.imageUrl} alt={`Foto de ${testimonial.name}`} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-md" />
            <p className="italic text-slate-700 mb-6 text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="font-semibold text-xl text-indigo-700">- {testimonial.name}{testimonial.age ? `, ${testimonial.age} anos` : ''}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const ClientResultsSection: React.FC = () => (
  <AnimatedSection id="resultados" className="py-16 md:py-24 bg-slate-100 px-4"> 
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-800">Transformações Reais: Mais de 1200 Vidas Impactadas</h2>
      <p className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto">
        Veja o poder da metodologia Bruna Arruda em ação. Estes são apenas alguns exemplos de mulheres que, como você, decidiram trilhar uma jornada de redescoberta e alcançaram resultados incríveis.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clientResultImages.map((result: ClientResultImage, index: number) => (
          <motion.div
            key={result.id}
            variants={itemVariantsStagger(index)}
            className="rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 aspect-[4/5] bg-slate-200"
          >
            <img 
              src={result.imageUrl} 
              alt={result.altText} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const MentorshipPlansSection: React.FC = () => (
  <AnimatedSection id="planos" className="py-16 md:py-24 bg-indigo-900 text-white px-4">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">Sua Jornada de Transformação Começa com um Plano</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {mentorshipPlans.map((plan: MentoriaPlan, index: number) => (
          <motion.div
            key={plan.id}
            variants={itemVariantsStagger(index)}
            className={`p-8 rounded-xl shadow-2xl flex flex-col h-full relative ${plan.highlightClass} ${plan.isPopular ? 'transform lg:scale-105 z-10' : ''}`}
            whileHover={{ scale: plan.isPopular ? 1.07 : 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-400 text-sm font-bold px-4 py-1.5 rounded-full uppercase shadow-md">
                Mais Popular!
              </div>
            )}
            <h3 className={`text-3xl font-bold mb-4 ${plan.isPopular ? 'text-slate-900' : 'text-amber-400'}`}>{plan.name}</h3>
            <p className={`text-5xl font-extrabold mb-2 ${plan.isPopular ? 'text-slate-800' : 'text-amber-400'}`}>
              {plan.price}
              {plan.priceDetails && <span className={`text-xl font-normal ml-1 ${plan.isPopular ? 'text-slate-700' : 'text-indigo-200'}`}>{plan.priceDetails}</span>}
            </p>
            {plan.id === 'premium' && <p className={`text-sm font-normal mb-6 ${plan.isPopular ? 'text-slate-600' : 'text-indigo-200'}`}>(ou R$ 456,80/mês no plano trimestral)</p>}

            <ul className={`text-lg list-disc list-inside mb-8 flex-grow space-y-2 text-left ${plan.isPopular ? 'text-slate-700' : 'text-indigo-100'}`}>
              {plan.features.map((feature, i) => {
                 const parts = feature.split(/(\*\*.*?\*\*)/g).filter(Boolean);
                 return (
                    <li key={i}>
                        {parts.map((part, partIndex) => 
                            part.startsWith('**') && part.endsWith('**') ? 
                            <strong key={partIndex} className="font-semibold">{part.slice(2, -2)}</strong> 
                            : part
                        )}
                    </li>
                 );
              })}
            </ul>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`w-full font-bold py-4 px-8 rounded-full text-lg uppercase shadow-md transition-all duration-300 inline-block ${plan.buttonClass}`}>
              {plan.ctaText}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const GeminiTipSection: React.FC = () => {
  const [userGoal, setUserGoal] = useState('');
  const [generatedTip, setGeneratedTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);

  const handleGenerateTip = useCallback(async () => {
    if (!userGoal.trim()) {
      setGeneratedTip("Por favor, digite seu objetivo para receber uma dica.");
      return;
    }
    setIsLoadingTip(true);
    setGeneratedTip("");
    try {
      const tip = await generateSimpleTip(userGoal);
      setGeneratedTip(tip);
    } catch (error) {
      console.error("Erro ao gerar dica:", error);
      setGeneratedTip("Ocorreu um erro ao gerar a dica. Tente novamente.");
    } finally {
      setIsLoadingTip(false);
    }
  }, [userGoal]);

  return (
    <AnimatedSection className="py-16 md:py-24 bg-white px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-indigo-800">Receba uma Dica Personalizada da Nossa IA! ✨</h2>
        <p className="text-xl mb-10 text-slate-700">
          Qual seu principal objetivo hoje? (Ex: "emagrecer", "ganhar massa", "mais energia e autoestima"). Nossa IA te dará uma dica rápida!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Digite seu objetivo fitness..."
            className="w-full sm:w-2/3 p-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 shadow-sm"
            value={userGoal}
            onChange={(e) => setUserGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerateTip()}
            aria-label="Seu objetivo fitness"
          />
          <motion.button
            className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-full text-lg uppercase shadow-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center w-full sm:w-auto"
            onClick={handleGenerateTip}
            disabled={isLoadingTip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoadingTip ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando...
              </>
            ) : (
              "RECEBER DICA"
            )}
          </motion.button>
        </div>
        {generatedTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-indigo-50 rounded-lg shadow-inner text-indigo-800 text-lg italic text-left"
            role="alert"
          >
            <p>&ldquo;{generatedTip}&rdquo;</p>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
};

const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <AnimatedSection id="faq" className="py-16 md:py-24 bg-slate-100 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-indigo-800 text-center">Suas Dúvidas, Nossas Respostas</h2>
        <div className="space-y-6">
          {faqs.map((faq: FAQItem, index: number) => (
            <motion.div variants={itemVariantsStagger(index)} key={index} className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
              <button
                className="w-full text-left p-6 font-semibold text-xl text-indigo-700 flex justify-between items-center focus:outline-none hover:bg-indigo-50 transition-colors duration-200"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                {faq.question}
                <span className={`text-indigo-500 text-3xl transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              {openFaq === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-6 pb-6 text-slate-600 text-lg leading-relaxed"
                  role="region"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const BlogPreviewSection: React.FC = () => (
  <AnimatedSection className="py-16 md:py-24 bg-white px-4">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-indigo-800">Nosso Blog: Dicas e Insights para sua Jornada</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogArticles.slice(0, 3).map((article, index) => ( 
          <motion.div 
            key={article.id}
            variants={itemVariantsStagger(index)} 
            className="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <Link to={`/blog/${article.slug}`} className="block hover:opacity-90 transition-opacity">
              <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover"/>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-sm text-amber-600 font-semibold mb-1 uppercase">{article.category}</span>
              <h3 className="text-xl font-bold mb-3">
                <Link to={`/blog/${article.slug}`} className="text-indigo-700 hover:text-indigo-900 transition-colors duration-200">
                  {article.title}
                </Link>
              </h3>
              <p className="text-slate-600 mb-4 flex-grow">{article.description}</p>
              <Link to={`/blog/${article.slug}`} className="text-indigo-600 hover:text-amber-600 font-semibold transition-colors duration-200 self-start inline-flex items-center group">
                Ler Mais <ChevronRightIcon className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-16"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/blog"
          className="bg-amber-500 text-slate-900 font-bold py-4 px-10 rounded-full text-lg uppercase shadow-lg hover:bg-amber-400 transform transition-all duration-300 inline-flex items-center group"
        >
          Ver Todos os Artigos
          <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </AnimatedSection>
);

const FinalCtaSection: React.FC = () => (
  <AnimatedSection id="contato" className="py-16 md:py-24 bg-gradient-to-br from-indigo-800 to-purple-900 text-white px-4">
    <div className="container mx-auto text-center max-w-3xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Chegou a Hora de Cuidar de Você e Resgatar Seu Poder!</h2>
      <p className="text-xl md:text-2xl mb-12">
        Não adie mais sua felicidade e bem-estar. Dê o primeiro passo em direção à mulher plena e confiante que você merece ser.
      </p>
      <motion.div
        className="space-y-6 sm:space-y-0 sm:flex sm:flex-col sm:items-center lg:flex-row lg:justify-center lg:gap-6"
        variants={itemVariants}
      >
        <Link
          to="/anamnese"
          className="w-full sm:w-auto lg:max-w-xs bg-amber-500 text-slate-900 font-bold py-4 px-10 rounded-full text-xl uppercase shadow-xl hover:bg-amber-400 transform transition-all duration-300 inline-flex items-center justify-center group mb-4 lg:mb-0"
        >
          Avaliação Inteligente
          <ChevronRightIcon className="w-6 h-6 ml-2 hidden sm:inline-block transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto lg:max-w-xs bg-green-500 text-white font-bold py-4 px-10 rounded-full text-xl uppercase shadow-xl hover:bg-green-600 transform transition-all duration-300 inline-flex items-center justify-center group"
        >
            <WhatsAppIcon className="w-6 h-6 mr-2 hidden sm:inline-block" />
            Falar com Bruna
        </a>
      </motion.div>
      <div className="mt-8 text-lg">
        <p>Ou entre em contato por:</p>
        <a href={`tel:${CONTACT_PHONE_NUMBER}`} className="inline-flex items-center hover:text-amber-400 transition-colors duration-200 mx-2">
            <PhoneIcon className="w-5 h-5 mr-2" /> {CONTACT_PHONE_DISPLAY}
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center hover:text-amber-400 transition-colors duration-200 mx-2">
            {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  </AnimatedSection>
);


export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProblemSolvedSection />
      <SolutionSection />
      <AboutBrunaSection />
      <OnlineCoachingPreviewSection /> 
      <TestimonialsSection />
      <ClientResultsSection /> 
      <MentorshipPlansSection />
      <GeminiTipSection />
      <FaqSection />
      <BlogPreviewSection />
      <FinalCtaSection />
    </>
  );
};
