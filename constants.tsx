
import React from 'react';
import { FAQItem, BlogArticle, Testimonial, MentoriaPlan, NavLink, ClientResultImage } from './types';

export const SITE_NAME = "Bruna Arruda";
export const SITE_SLOGAN = "Resgate sua Autoestima, Transforme seu Corpo."; 
export const SITE_LOGO_URL = "https://ubie.com.br/image/logo-brutraining-fitness.png"; 

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Blog" },
  { href: "/anamnese", label: "Avaliação IA" },
];

export const brunaHeroImageUrl = "https://ubie.com.br/image/bruna.png"; 
export const brunaAboutImageUrl = "https://ubie.com.br/image/bruna.png"; 
export const onlineCoachingImageUrl = "https://ubie.com.br/image/mulher-praticando.png"; 
export const healthyFoodImageUrl = "https://ubie.com.br/image/saudavel.png"; 
export const autoestimaImageUrl = "https://ubie.com.br/image/resgate-autoestima.png";
export const meditandoImageUrl = "https://ubie.com.br/image/meditando.png";
export const mulherRealImageUrl = "https://ubie.com.br/image/mulher-real.png";


export const CONTACT_PHONE_NUMBER = "+558898071550";
export const CONTACT_PHONE_DISPLAY = "(88) 99807-1550";
export const WHATSAPP_MESSAGE_GREETING = "Olá Bruna, vim pelo site e gostaria de mais informações sobre a mentoria!";
export const WHATSAPP_LINK = `https://wa.me/${CONTACT_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_GREETING)}`;
export const CONTACT_EMAIL = "contato@brunaarruda.com";

export const WEBHOOK_URL_MAKE_ZAPI = "https://hook.us1.make.com/youruniquewebhookidentifier"; // SUBSTITUA COM SUA URL REAL

export const ANAMNESIS_QUESTIONS = [
  "Qual é seu maior desejo?", // Pergunta inicial customizada
  "Qual é seu maior incômodo ou insatisfação com seu corpo hoje?",
  "O que você já tentou até agora para mudar isso? Funcionou?",
  "Como está sua alimentação na prática? Há excessos, restrições ou falta de controle?",
  "Com que frequência você se movimenta ou pratica atividade física? E como se sente ao fazer?",
  "Quais emoções você mais sente em relação ao seu corpo e ao processo de mudança?",
  "Você já percebe algum padrão que te atrapalha nos seus hábitos (alimentar, emocional ou comportamental)?",
  "O que você deseja alcançar de forma realista nos próximos 3 a 6 meses?",
  "O que você está disposto(a) a mudar a partir de agora para isso acontecer?"
];


export const faqs: FAQItem[] = [
  {
    question: "Como funciona a mentoria personalizada da Bruna?",
    answer: "Nossa mentoria começa com uma avaliação detalhada de seus objetivos, nível de condicionamento e histórico. A partir daí, Bruna cria um plano de treino e alimentação 100% personalizado, com acompanhamento contínuo e sessões individuais para ajustar o que for necessário, sempre respeitando sua rotina e individualidade."
  },
  {
    question: "Quais resultados posso esperar com a mentoria?",
    answer: "Você pode esperar o emagrecimento definitivo, resgate da sua autoestima, mais energia, e o mais importante: a construção de hábitos saudáveis e uma nova relação de amor e cuidado com seu corpo. Muitas mulheres redescobrem seu poder pessoal e se sentem plenas e confiantes."
  },
  {
    question: "A mentoria é para mim, mesmo sendo mãe e sem muito tempo?",
    answer: "Com certeza! Minha metodologia é desenhada para mulheres reais, incluindo mães e profissionais com rotinas corridas. Os treinos são eficientes e adaptados para que você não precise passar horas na academia, e o acompanhamento considera suas particularidades."
  },
  {
    question: "Já tentei de tudo para emagrecer. O que é diferente no seu método?",
    answer: "Entendo perfeitamente sua frustração. Meu método 'brunaTreinamente' vai além do físico, integrando a Programação Neurolinguística (PNL) para reprogramar sua mentalidade, construir hábitos sustentáveis e tratar a raiz das dificuldades. É uma jornada de redescoberta para resultados que duram."
  },
  {
    question: "Preciso ter experiência prévia em treinos?",
    answer: "Não! A mentoria é adaptada para todos os níveis, do iniciante ao avançado. Bruna personaliza o plano para atender às suas necessidades específicas, garantindo que você se sinta segura e motivada."
  },
];

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "5-dicas-essenciais-iniciantes-musculacao",
    title: "5 Dicas Essenciais para Iniciantes na Musculação",
    description: "Começar na academia pode ser desafiador. Aprenda os fundamentos para ter resultados e evitar lesões.",
    imageUrl: "https://picsum.photos/seed/workout-beginner-hd/600/400",
    author: "Bruna Arruda",
    date: "15 de Julho, 2024",
    category: "Treino",
    content: `
      <p class="mb-4">Iniciar a jornada na musculação é um passo incrível para a sua saúde e bem-estar. No entanto, para garantir que essa caminhada seja eficaz e segura, alguns fundamentos são cruciais. Aqui estão cinco dicas essenciais que separei para você:</p>
      
      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">1. Priorize a Forma, Não a Carga</h3>
      <p class="mb-4">Um erro comum entre iniciantes é focar excessivamente na quantidade de peso levantado. Lembre-se: a execução correta dos movimentos é primordial. Uma forma inadequada não apenas diminui a eficácia do exercício, mas também aumenta significativamente o risco de lesões. Comece com cargas leves, aprenda o movimento e, só então, progrida gradualmente.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">2. Consistência é a Chave</h3>
      <p class="mb-4">Resultados na musculação não aparecem da noite para o dia. É a consistência que transforma esforço em progresso. Defina uma rotina de treinos realista e que você consiga manter a longo prazo. Mesmo nos dias de menor motivação, lembre-se do seu objetivo e compareça.</p>

      <blockquote class="border-l-4 border-amber-500 italic text-slate-600 pl-4 py-2 my-6">
        "A regularidade no treinamento induz adaptações fisiológicas progressivas que são a base para a hipertrofia e o ganho de força." 
        <span class="block text-sm text-slate-500 mt-1">- Dra. Helena Souza, Fisiologista do Exercício</span>
      </blockquote>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">3. Nutrição Adequada: O Combustível para Seus Músculos</h3>
      <p class="mb-4">Seu treino é o estímulo, mas a nutrição é o que permite a recuperação e o crescimento muscular. Consuma proteínas de qualidade, carboidratos complexos para energia e gorduras saudáveis. A hidratação também é fundamental. Considere consultar um nutricionista para um plano alimentar alinhado aos seus objetivos.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">4. O Descanso é Parte do Treino</h3>
      <p class="mb-4">Muitos negligenciam a importância do descanso, mas é durante o repouso que seus músculos se recuperam e crescem. Garanta boas noites de sono e inclua dias de descanso na sua rotina semanal. O overtraining pode levar à estagnação e até mesmo a lesões.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">5. Escute Seu Corpo e Seja Paciente</h3>
      <p class="mb-4">Aprenda a diferenciar o desconforto muscular do treino de uma dor que sinaliza algo errado. Não ignore sinais de alerta. E, acima de tudo, seja paciente. A transformação física leva tempo e dedicação. Celebre cada pequena vitória e confie no processo!</p>
      
      <p class="mt-6">Lembre-se, estou aqui para te guiar nessa jornada. Com a orientação correta, seus objetivos são totalmente alcançáveis!</p>
    `
  },
  {
    id: 2,
    slug: "como-montar-plano-alimentar-saudavel",
    title: "Como Montar Seu Próprio Plano Alimentar Saudável",
    description: "Descubra os segredos para uma nutrição eficaz que complemente seu treino e otimize sua saúde.",
    imageUrl: "https://picsum.photos/seed/healthy-eating-hd/600/400",
    author: "Bruna Arruda",
    date: "10 de Julho, 2024",
    category: "Nutrição",
    content: `
      <p class="mb-4">Uma alimentação saudável é a base para qualquer objetivo fitness, seja emagrecimento, ganho de massa muscular ou simplesmente mais qualidade de vida. Montar um plano alimentar pode parecer complexo, mas com alguns princípios básicos, você pode criar uma estrutura nutricional eficaz.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">1. Defina Seus Objetivos e Necessidades Calóricas</h3>
      <p class="mb-4">O primeiro passo é entender o que você quer alcançar. Seu objetivo (perder peso, manter, ganhar massa) influenciará diretamente suas necessidades calóricas diárias. Existem calculadoras online que podem dar uma estimativa, mas o ideal é procurar um profissional para uma avaliação precisa.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">2. Priorize Alimentos Integrais e Naturais</h3>
      <p class="mb-4">A base da sua alimentação deve ser composta por alimentos em seu estado mais natural possível: frutas, vegetais, legumes, grãos integrais, proteínas magras (frango, peixe, ovos, leguminosas) e gorduras boas (abacate, azeite, castanhas).</p>
      
      <blockquote class="border-l-4 border-amber-500 italic text-slate-600 pl-4 py-2 my-6">
        "A densidade nutricional dos alimentos é mais importante do que apenas contar calorias. Alimentos integrais fornecem vitaminas, minerais e fibras essenciais para o bom funcionamento do organismo."
        <span class="block text-sm text-slate-500 mt-1">- Nutricionista Ricardo Alves, Especialista em Nutrição Funcional</span>
      </blockquote>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">3. Distribua os Macronutrientes</h3>
      <p class="mb-4"><strong>Proteínas:</strong> Essenciais para construção e reparo muscular. Inclua fontes em todas as principais refeições.</p>
      <p class="mb-4"><strong>Carboidratos:</strong> Principal fonte de energia. Opte por complexos (batata doce, arroz integral, aveia) que fornecem energia de forma gradual.</p>
      <p class="mb-4"><strong>Gorduras:</strong> Importantes para funções hormonais e absorção de vitaminas. Escolha as insaturadas.</p>
      <p class="mb-4">A proporção ideal varia conforme o objetivo e individualidade, mas uma distribuição equilibrada é um bom ponto de partida.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">4. Planeje Suas Refeições e Lanches</h3>
      <p class="mb-4">Ter um planejamento evita decisões impulsivas e pouco saudáveis. Organize suas refeições principais e tenha opções de lanches nutritivos à mão (frutas, iogurte natural, oleaginosas).</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">5. Hidrate-se e Modere Industrializados</h3>
      <p class="mb-4">A água é vital para todos os processos metabólicos. Mantenha-se bem hidratado ao longo do dia. Reduza o consumo de alimentos ultraprocessados, ricos em açúcares, sódio e gorduras ruins.</p>

      <p class="mt-6">Montar um plano alimentar é um ato de autocuidado. Comece com pequenas mudanças, seja consistente e ajuste conforme necessário. E lembre-se, uma mentoria nutricional pode personalizar ainda mais esse processo, otimizando seus resultados!</p>
    `
  },
  {
    id: 3,
    slug: "supere-plato-estrategias-evoluir",
    title: "Supere o Platô: Estratégias para Continuar Evoluindo",
    description: "Chegou a um ponto de estagnação? Conheça técnicas avançadas para quebrar barreiras e ir além.",
    imageUrl: "https://picsum.photos/seed/fitness-plateau-hd/600/400",
    author: "Bruna Arruda",
    date: "5 de Julho, 2024",
    category: "Performance",
    content: `
      <p class="mb-4">Todo praticante de atividade física, em algum momento, se depara com o temido platô: aquele período em que os resultados parecem estagnar, apesar do esforço contínuo. Mas não se desanime! O platô é um sinal de que seu corpo se adaptou aos estímulos atuais e precisa de novas estratégias para continuar evoluindo.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">1. Varie Seu Treinamento (Princípio da Variabilidade)</h3>
      <p class="mb-4">Se você faz sempre os mesmos exercícios, com as mesmas cargas e repetições, seu corpo eventualmente se acostuma. Introduza novos exercícios, mude a ordem, altere o número de séries/repetições, o tempo de descanso ou a cadência dos movimentos. Experimente diferentes métodos de treino como dropsets, supersets ou pirâmides.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">2. Ajuste a Intensidade e o Volume</h3>
      <p class="mb-4">Para quebrar o platô, pode ser necessário aumentar a intensidade (carga) ou o volume (total de séries/repetições) do seu treino. Faça isso de forma progressiva e planejada para evitar o overtraining.</p>
      
      <blockquote class="border-l-4 border-amber-500 italic text-slate-600 pl-4 py-2 my-6">
        "O platô muitas vezes é um sinal de que sua mente precisa de um novo estímulo tanto quanto seu corpo. A quebra de barreiras começa com a reprogramação de crenças limitantes sobre suas próprias capacidades."
        <span class="block text-sm text-slate-500 mt-1">- Fernando Caesar, especialista em PNL Avançada para uma melhor performance comportamental</span>
      </blockquote>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">3. Revise Sua Nutrição e Hidratação</h3>
      <p class="mb-4">Seu corpo precisa dos nutrientes certos para se recuperar e progredir. Um platô pode ser sinal de que sua ingestão calórica ou de macronutrientes (especialmente proteínas) precisa de ajuste. A desidratação também impacta negativamente a performance.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">4. Priorize o Descanso e a Recuperação</h3>
      <p class="mb-4">Treinar mais nem sempre é a solução. O descanso adequado é crucial. Considere incluir semanas de "deload" (redução da intensidade/volume) para permitir uma supercompensação do corpo. A qualidade do sono também é fundamental.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">5. Foque na Conexão Mente-Músculo</h3>
      <p class="mb-4">Concentre-se em sentir o músculo alvo trabalhando durante cada repetição. Uma melhor conexão mente-músculo pode aumentar a ativação das fibras musculares e otimizar os resultados do exercício.</p>

      <p class="mt-6">Superar um platô exige paciência, estratégia e, muitas vezes, a orientação de um profissional. Analise seus hábitos, ajuste sua rota e lembre-se que cada desafio superado te deixa mais forte e resiliente. Vamos juntos quebrar essas barreiras!</p>
    `
  },
   {
    id: 4,
    slug: "pnl-transformacao-fitness",
    title: "PNL e a Transformação Fitness: Mente Forte, Corpo Forte",
    description: "Entenda como a Programação Neurolinguística pode ser sua aliada para construir hábitos e alcançar o sucesso.",
    imageUrl: "https://picsum.photos/seed/nlp-mindset-hd/600/400",
    author: "Bruna Arruda",
    date: "20 de Julho, 2024",
    category: "Mentalidade",
    content: `
      <p class="mb-4">A jornada fitness vai muito além de exercícios e dietas. A mente desempenha um papel crucial na construção de hábitos duradouros e na superação de desafios. É aqui que a Programação Neurolinguística (PNL) surge como uma ferramenta poderosa para potencializar sua transformação.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">O que é PNL?</h3>
      <p class="mb-4">A PNL é um conjunto de técnicas que estuda como organizamos nossos pensamentos, sentimentos, linguagem e comportamentos para alcançar os resultados que desejamos. Ela nos ensina a entender e modificar nossos "programas mentais" para otimizar nossa performance em diversas áreas da vida, incluindo a saúde e o bem-estar.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">Como a PNL Pode Ajudar na Sua Jornada Fitness?</h3>
      
      <p class="mb-2 mt-4"><strong>1. Definição Clara de Objetivos (Formulação de Objetivos):</strong> A PNL ajuda a transformar desejos vagos ("quero emagrecer") em objetivos específicos, mensuráveis, alcançáveis, relevantes e temporais (SMART), aumentando drasticamente as chances de sucesso.</p>
      
      <p class="mb-2"><strong>2. Reprogramação de Crenças Limitantes:</strong> Muitas vezes, crenças como "não consigo seguir uma dieta" ou "não nasci para ser atleta" nos sabotam. A PNL oferece técnicas para identificar e ressignificar essas crenças, substituindo-as por pensamentos fortalecedores.</p>

      <blockquote class="border-l-4 border-amber-500 italic text-slate-600 pl-4 py-2 my-6">
        "A Programação Neurolinguística nos oferece ferramentas poderosas para alinhar nossos pensamentos e ações com nossos objetivos de saúde. Dominar sua mente é o primeiro passo para dominar seu corpo e alcançar uma transformação duradoura."
        <span class="block text-sm text-slate-500 mt-1">- Fernando Caesar, especialista em PNL Avançada para uma melhor performance comportamental</span>
      </blockquote>
      
      <p class="mb-2"><strong>3. Criação de Âncoras Positivas:</strong> Âncoras são gatilhos (um gesto, uma palavra, uma música) que associamos a um estado emocional específico. Com a PNL, podemos criar âncoras para acessar estados de motivação, foco e energia quando mais precisarmos, como antes de um treino.</p>
      
      <p class="mb-2"><strong>4. Visualização e Modelagem:</strong> Visualizar-se alcançando seus objetivos e modelar comportamentos de pessoas que já atingiram o sucesso são técnicas de PNL que fortalecem a confiança e direcionam suas ações.</p>
      
      <p class="mb-2"><strong>5. Melhoria da Comunicação Interna:</strong> A forma como falamos conosco (nosso diálogo interno) impacta diretamente nossas emoções e comportamentos. A PNL ensina a construir um diálogo interno mais positivo e encorajador.</p>

      <h3 class="text-xl font-semibold text-indigo-700 mt-6 mb-3">Integrando Corpo e Mente</h3>
      <p class="mb-4">Na minha metodologia, a PNL é uma aliada fundamental. Acredito que para uma transformação completa e sustentável, precisamos trabalhar não apenas o corpo, mas também a mente. Ao alinhar seus pensamentos e emoções com seus objetivos fitness, você desbloqueia um potencial incrível.</p>
      
      <p class="mt-6">Se você busca resultados que vão além da estética e promovem uma mudança real de estilo de vida, entender e aplicar os princípios da PNL pode ser o diferencial que faltava. Estou aqui para te ajudar a integrar essas ferramentas na sua jornada!</p>
    `
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "A Bruna mudou minha vida! Perdi 15kg e ganhei muita confiança. Os treinos são desafiadores, mas o suporte dela faz toda a diferença.",
    name: "Ana Paula",
    age: 32,
    imageUrl: "https://picsum.photos/seed/cliente-ana/100/100"
  },
  {
    quote: "Sempre tive dificuldade em manter a disciplina. A mentoria da Bruna me deu a consistência e os resultados que eu buscava. Performance e autoestima nas alturas!",
    name: "Carlos Henrique",
    age: 45,
    imageUrl: "https://picsum.photos/seed/cliente-carlos/100/100"
  },
  {
    quote: "A flexibilidade do plano e o acompanhamento individualizado são incríveis. Bruna entende suas necessidades e te impulsiona para o próximo nível.",
    name: "Mariana Silva",
    age: 28,
    imageUrl: "https://picsum.photos/seed/cliente-mariana/100/100"
  },
];

export const clientResultImages: ClientResultImage[] = [
  { id: 1, imageUrl: "https://secureupload.mfitpersonal.com.br/190832/salespage/3278411.jpeg", altText: "Exemplo de resultado cliente 1" },
  { id: 2, imageUrl: "https://secureupload.mfitpersonal.com.br/190832/salespage/9166920.jpeg", altText: "Exemplo de resultado cliente 2" },
  { id: 3, imageUrl: "https://secureupload.mfitpersonal.com.br/190832/salespage/4113210.jpeg", altText: "Exemplo de resultado cliente 3" },
];

export const mentorshipPlans: MentoriaPlan[] = [
  {
    id: 'essencial',
    name: "Mentoria Essencial (Reabilitação Corpo & Mente)",
    price: "R$ 189",
    priceDetails: "/mês",
    features: [
      "Aulas Semanais Online ao Vivo com Bruna & Fernando Caesar: Interaja diretamente com os especialistas.",
      "Acompanhamento no Grupo de WhatsApp: Bruna e Fernando Caesar interagem, respondem e avaliam cada caso.",
      "Programa 'Corpo & Mente': Reabilitação focada em PNL com especialista (2 meses).",
      "Plataforma Exclusiva de Membros: Acesso vitalício a vídeos e materiais de apoio.",
      "Sessões Estendidas: Participe das sessões ao vivo por 1 ano após o programa."
    ],
    isPopular: true,
    ctaText: "ESCOLHER PLANO ESSENCIAL",
    highlightClass: "bg-amber-400 text-slate-900 ring-4 ring-amber-500",
    buttonClass: "bg-slate-900 text-white hover:bg-slate-700"
  },
  {
    id: 'premium',
    name: "Mentoria Premium (Individualizado)",
    price: "R$ 4.568",
    priceDetails: "/pacote 3 meses",
    features: [
      "Tudo do Essencial (acesso à plataforma e sessões em grupo).",
      "Planos de Treino e Alimentação 100% Personalizados: Elaborados sob medida.",
      "Sessões Individuais Exclusivas: 2 sessões 1-a-1 com a Bruna por mês.",
      "Suporte Direto e Prioritário: Canal de comunicação exclusivo para tirar dúvidas.",
      "Acompanhamento de progresso detalhado e relatórios de performance.",
      "Acesso prioritário a workshops e conteúdos avançados."
    ],
    ctaText: "ESCOLHER PLANO PREMIUM",
    highlightClass: "bg-indigo-700 text-white",
    buttonClass: "bg-amber-500 text-slate-900 hover:bg-amber-400"
  },
  {
    id: 'elite',
    name: "Mentoria Elite (Exclusiva VIP)",
    price: "R$ 12.000",
    priceDetails: "/1 ano",
    features: [
      "Tudo do Premium (com foco total na experiência VIP).",
      "Atendimento Particular e Personalizado: Sessões individuais semanais.",
      "Resultados Intensos e Rápidos: Acompanhamento diário para maximizar o progresso.",
      "Exclusividade Total: Suporte 24/7 via WhatsApp direto com a Bruna.",
      "Consultoria nutricional avançada e ajustes em tempo real.",
      "Acesso prioritário a todos os workshops e eventos exclusivos.",
      "Bônus de produtos/serviços parceiros de elite."
    ],
    ctaText: "ESCOLHER PLANO ELITE",
    highlightClass: "bg-indigo-700 text-white",
    buttonClass: "bg-amber-500 text-slate-900 hover:bg-amber-400"
  }
];


// SVG Icons
export const DumbbellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.668 4.062C20.268 3.313 19.381 3 18.5 3c-.707 0-1.348.188-1.89.531l-3.35 2.094c-.281.175-.406.519-.328.828.075.306.356.516.672.516h.003L13.25 7c-1.369 0-2.584.597-3.468 1.531L6.75 5.5A2.492 2.492 0 004.5 4C3.122 4 2 5.121 2 6.5S3.122 9 4.5 9H5V8H4.5A1.502 1.502 0 013 6.5c0-.827.673-1.5 1.5-1.5.15 0 .299.025.438.075l3.243 3.244L4.812 11.69A3.513 3.513 0 002 14.5c0 1.93 1.57 3.5 3.5 3.5.993 0 1.89-.413 2.531-1.078l1.391-1.437.019.019L12 12.938l-1.078-1.078.016.019-1.422-1.469c.875-.828 2.062-1.379 3.484-1.379h.003l.369.034.028.003c.319 0 .6-.212.672-.519.075-.306-.05-.65-.328-.828L10.26 5.531A3.48 3.48 0 008.5 5c-.707 0-1.348.188-1.891.531L3.34 7.625A2.492 2.492 0 001.5 9C.122 9-1 7.879-1 6.5S.122 4 1.5 4H2v1h-.5a1.502 1.502 0 00-1.5 1.5c0 .827.673 1.5 1.5 1.5.15 0 .299-.025.438.075l3.243-3.244L6.188 6.31A3.513 3.513 0 018.5 4c.993 0 1.89.413 2.531 1.078l1.391 1.437.019-.019L15 8.062l-1.078 1.078.016-.019-1.422 1.469a3.476 3.476 0 013.484 1.379h.003l.369-.034.028-.003c.319 0 .6-.212.672-.519.075-.306-.05-.65-.328-.828L13.368 8.531A3.48 3.48 0 0111.5 8c-.707 0-1.348.188-1.891.531L6.34 10.625A2.492 2.492 0 014.5 12c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5H5V6h-.5A1.502 1.502 0 013 7.5c0 .827.673 1.5 1.5 1.5.15 0 .299-.025.438-.075l3.243-3.244L11.551 9h.013c1.369 0 2.584-.597 3.468-1.531l3.031-3.032A3.513 3.513 0 0120.5 2c.993 0 1.89.413 2.531 1.078L24 4.062c.4.75.1 1.706-.613 2.134L19.5 8.562l-1.719-1.719L20.668 4.062zM4.5 17c-1.378 0-2.5-1.121-2.5-2.5S3.122 12 4.5 12H5v1h-.5A1.502 1.502 0 003 14.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5V12h.5c1.378 0 2.5 1.121 2.5 2.5S7.878 17 6.5 17H4.5zm15-2c-1.378 0-2.5-1.121-2.5-2.5S18.122 10 19.5 10h.5v1h-.5a1.502 1.502 0 00-1.5 1.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5V10h.5c1.378 0 2.5 1.121 2.5 2.5S22.878 15 21.5 15h-2z" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.25 13.5a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM18 15a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3A.75.75 0 0118 15zM4.125 6a.75.75 0 01.75-.75h14.25a.75.75 0 010 1.5H4.875a.75.75 0 01-.75-.75zM18 9.75A.75.75 0 0118.75 9h3a.75.75 0 010 1.5h-3A.75.75 0 0118 9.75zM2.25 18a.75.75 0 000 1.5h13.5a.75.75 0 000-1.5h-13.5zM21.75 2.25a.75.75 0 00-.75.75v18a.75.75 0 001.5 0V3a.75.75 0 00-.75-.75z" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.004-.004.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.125 1.125 1.125 0 002.25 0c0-2.69 2.186-4.875 4.875-4.875s4.875 2.185 4.875 4.875a1.125 1.125 0 002.25 0A7.125 7.125 0 0010.375 12zM21.125 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM18.125 14.25a.75.75 0 00-1.5 0v2.625H14a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0V18.375h2.625A.75.75 0 0022.25 17.625H19.625v-2.625a.75.75 0 00-1.5 0v-.75z" />
    </svg>
);


export const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
  </svg>
);

export const PhoneIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.07a1.5 1.5 0 01-1.052 1.742L5.602 8.54a13.203 13.203 0 006.958 6.958l.781-1.173a1.5 1.5 0 011.742-1.052l3.07.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15A13 13 0 012 3.5z" clipRule="evenodd" />
  </svg>
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2.05 22L7.31 20.62C8.75 21.42 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.84 19.13 4.96C17.34 3.1 14.89 2 12.04 2M12.04 3.63C16.56 3.63 20.32 7.39 20.32 11.91C20.32 16.43 16.56 20.19 12.04 20.19C10.49 20.19 8.99 19.78 7.74 19L7.33 18.78L4.29 19.71L5.26 16.77L5.04 16.36C4.19 15.01 3.76 13.48 3.76 11.91C3.76 7.39 7.52 3.63 12.04 3.63M17.02 14.61C16.83 14.52 15.77 14.03 15.54 13.94C15.31 13.85 15.15 13.81 14.99 14.04C14.83 14.27 14.33 14.88 14.18 15.04C14.03 15.2 13.88 15.22 13.6 15.13C13.32 15.04 12.52 14.77 11.56 13.91C10.81 13.26 10.31 12.42 10.16 12.19C10.01 11.96 10.11 11.85 10.25 11.71C10.37 11.59 10.51 11.42 10.65 11.27C10.79 11.12 10.83 11.01 10.92 10.84C11.01 10.67 10.97 10.53 10.9 10.4C10.83 10.27 10.34 9.04 10.15 8.57C9.96 8.1 9.77 8.15 9.62 8.14H9.08C8.91 8.14 8.66 8.23 8.45 8.46C8.24 8.69 7.75 9.15 7.75 10.11C7.75 11.07 8.48 11.96 8.62 12.12C8.76 12.28 10.36 14.84 12.94 15.96C13.56 16.27 14.02 16.43 14.36 16.54C14.87 16.71 15.31 16.68 15.65 16.61C16.03 16.53 16.83 16.09 17.06 15.52C17.29 14.95 17.29 14.46 17.21 14.37C17.13 14.28 17.02 14.61 17.02 14.61Z"/>
    </svg>
);


export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

export const itemVariantsStagger = (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
});


export const brunaBio = {
  greeting: "Olá! Sou Bruna Arruda.",
  mission: "Ajudo mulheres, especialmente aquelas acima dos 30 anos, casadas, com filhos e uma rotina agitada, a resgatar sua autoestima através do emagrecimento definitivo. Se você já tentou de tudo e se sente frustrada, estou aqui para mostrar um novo caminho.",
  philosophy: "Acredito que seu corpo é seu templo, a base do seu poder pessoal. Meu trabalho, que chamo de 'brunaTreinamente', foca em reconectar você com a importância de nutrir e honrar esse templo. Com minha energia única, transformo o emagrecimento em uma jornada de redescoberta, para que você se sinta feliz, confiante e plena.",
  experienceSummary: "Com mais de 10 anos de experiência e mais de 1.200 vidas transformadas em todo o Brasil, desenvolvi uma metodologia que une treinos personalizados e intensos (sem desperdiçar horas na academia) com estratégias de Programação Neurolinguística (PNL) para construir hábitos sustentáveis.",
  locationAndCommitment: "Baseada em Joinville, Santa Catarina, e natural de Juazeiro do Norte, Ceará, meu compromisso é com a melhoria significativa da sua qualidade de vida, focando no bem-estar físico, mental e no fortalecimento da autoestima feminina.",
  educationAndSpecializations: [
    "Bacharelado e Licenciatura em Educação Física (UVA)",
    "Pós-graduação em Personal Trainer",
    "Pós-graduação em Reabilitação de Lesões e Correções Posturais",
    "Especialização em Treinamento para Emagrecimento, Ganho de Massa e Aumento da Autoestima Feminina",
    "Especialista em Programação Neurolinguística (PNL) aplicada ao Comportamento e Performance"
  ],
  callToAction: "Vamos juntas nessa jornada de autoconhecimento e superação de limites, para você se sentir plena e confiante no seu próprio corpo!"
};


export const problemCards = [
  { title: "Sem tempo para si mesma?", description: "A rotina de mãe, esposa e profissional te impede de cuidar de você como gostaria?", Icon: UsersIcon, iconColor: "text-pink-500" },
  { title: "Já tentou de tudo e nada funciona?", description: "Cansada de dietas restritivas e treinos que não trazem resultados duradouros?", Icon: ChartBarIcon, iconColor: "text-red-500" },
  { title: "Autoestima precisando de um up?", description: "Sente que perdeu a confiança e o amor pelo próprio corpo ao longo do caminho?", Icon: HeartIcon, iconColor: "text-green-500" },
  { title: "Precisa de um plano que entenda sua vida?", description: "Busca orientação profissional que se adapte à sua realidade e não o contrário?", Icon: DumbbellIcon, iconColor: "text-amber-500" },
];

export const solutionCards = [
    { 
      title: "Emagrecimento Definitivo e Sustentável", 
      description: "Alcance seus objetivos de forma saudável, sem efeito sanfona, e aprenda a manter os resultados.",
      imageUrl: healthyFoodImageUrl 
    },
    { 
      title: "Resgate da Autoestima e Confiança", 
      description: "Reconecte-se com seu corpo, ame quem você é e sinta-se plena em sua própria pele.",
      imageUrl: autoestimaImageUrl
    },
    { 
      title: "Método 'brunaTreinamente' (Corpo & Mente)", 
      description: "Integramos PNL para fortalecer sua mentalidade, construir hábitos e superar bloqueios.",
      imageUrl: meditandoImageUrl
    },
    { 
      title: "Resultados Reais para Mulheres Reais", 
      description: "Planos adaptados para sua rotina, mesmo que corrida. Você não está sozinha nessa jornada!",
      imageUrl: mulherRealImageUrl
    },
];
