
import { GoogleGenAI, GenerateContentResponse, Chat, Part } from "@google/genai";
import { mentorshipPlans, brunaBio as brunaBioConstant, CONTACT_PHONE_DISPLAY, WHATSAPP_LINK, CONTACT_EMAIL, ANAMNESIS_QUESTIONS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); 
const model = 'gemini-2.5-flash-preview-04-17';

export const generateSimpleTip = async (userGoal: string): Promise<string> => {
  if (!API_KEY) return "Erro: Chave de API não configurada.";
  try {
    const prompt = `Gere uma dica de treino ou nutrição curta e motivacional (máximo 60 palavras) para alguém que tem o objetivo de: "${userGoal}". Se o objetivo incluir 'autoestima' ou 'confiança', conecte a dica com isso. Comece com uma saudação personalizada e termine com um incentivo poderoso focado no bem-estar e na força interior. Não use markdown como '**' para negrito.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: [{ role: "user", parts: [{text: prompt}] }],
    });

    return response.text;
  } catch (error) {
    console.error("Error generating tip from Gemini:", error);
    return "Desculpe, não consegui gerar uma dica no momento. Tente novamente mais tarde.";
  }
};

const formatMentorshipPlansForAI = (): string => {
  return mentorshipPlans.map(plan => 
    `- ${plan.name}: ${plan.features.slice(0, 2).join('. ')}${plan.features.length > 2 ? '...' : '.'} (Preço: ${plan.price}${plan.priceDetails || ''})`
  ).join('\n');
};

export const createAnamnesisChat = (): Chat => {
  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. Cannot create chat.");
  }

  const brunaSummaryForAI = `
${brunaBioConstant.greeting} ${brunaBioConstant.mission} ${brunaBioConstant.philosophy} ${brunaBioConstant.experienceSummary}
Minha metodologia 'brunaTreinamente' é especialmente eficaz para mulheres 30+, casadas, com filhos, sem tempo para longas horas na academia e que já tentaram outras abordagens sem sucesso duradouro.
Foco no emagrecimento definitivo, resgate da autoestima, e na compreensão do corpo como um templo.
Contato da Bruna: Telefone ${CONTACT_PHONE_DISPLAY}, WhatsApp (${WHATSAPP_LINK}), E-mail (${CONTACT_EMAIL}).
`;

  const systemInstructionText = `Você é a 'Assistente IA da Bruna Arruda', especialista em Treino Físico para Emagrecimento e Programação Neurolinguística (PNL).
Seu objetivo principal é conduzir um 'Diagnóstico Corpo e Mente' com a usuária, fazendo 8 perguntas chave para entender suas necessidades e, ao final, gerar um laudo resumido. Seja empático, profissional e motivador. Não use markdown como '**' para negrito; o frontend cuidará disso. Use linguagem clara e faça uma pergunta por vez.

Contexto sobre Bruna Arruda (para guiar seu tom e informações):
${brunaSummaryForAI}

INSTRUÇÕES DO FLUXO DA CONVERSA:

1.  APRESENTAÇÃO E PRIMEIRA PERGUNTA:
    *   Comece se apresentando: "Olá! Sou a Assistente IA da Bruna Arruda. Estou aqui para te ajudar a iniciar sua jornada de transformação com um breve Diagnóstico Corpo e Mente. Vamos começar?"
    *   Após a confirmação da usuária (ou se ela já iniciar respondendo), faça a primeira pergunta: "${ANAMNESIS_QUESTIONS[0]}" (Qual é seu maior desejo?)

2.  SEQUÊNCIA DAS PERGUNTAS DE DIAGNÓSTICO:
    *   Após a resposta da usuária à pergunta anterior, prossiga com a próxima pergunta da lista abaixo, uma de cada vez. Tente conectar as perguntas de forma natural, se possível.
    *   Lista das 8 Perguntas do Diagnóstico (a primeira já foi feita):
        1.  (Já feita) "${ANAMNESIS_QUESTIONS[0]}"
        2.  "${ANAMNESIS_QUESTIONS[1]}" (Qual é seu maior incômodo ou insatisfação com seu corpo hoje?)
        3.  "${ANAMNESIS_QUESTIONS[2]}" (O que você já tentou até agora para mudar isso? Funcionou?)
        4.  "${ANAMNESIS_QUESTIONS[3]}" (Como está sua alimentação na prática? Há excessos, restrições ou falta de controle?)
        5.  "${ANAMNESIS_QUESTIONS[4]}" (Com que frequência você se movimenta ou pratica atividade física? E como se sente ao fazer?)
        6.  "${ANAMNESIS_QUESTIONS[5]}" (Quais emoções você mais sente em relação ao seu corpo e ao processo de mudança?)
        7.  "${ANAMNESIS_QUESTIONS[6]}" (Você já percebe algum padrão que te atrapalha nos seus hábitos (alimentar, emocional ou comportamental)?)
        8.  "${ANAMNESIS_QUESTIONS[7]}" (O que você deseja alcançar de forma realista nos próximos 3 a 6 meses?)
        9.  "${ANAMNESIS_QUESTIONS[8]}" (O que você está disposto(a) a mudar a partir de agora para isso acontecer?)
    *   Aguarde a resposta da usuária antes de passar para a próxima pergunta.

3.  GERAÇÃO E APRESENTAÇÃO DO LAUDO:
    *   Após a usuária responder à 9ª pergunta (que é a 8ª do diagnóstico numerado):
        *   Agradeça: "Obrigada por compartilhar suas informações. Com base nas suas respostas, preparei um breve Laudo Corpo e Mente para te dar uma clareza inicial."
        *   Apresente o Laudo. O Laudo DEVE seguir esta estrutura, usando as respostas da usuária para preencher cada pilar de forma concisa. Use parágrafos e quebras de linha (\n).
            "**Pilar 1: Seu Estado Atual (Físico, Mental e Alimentar)**\n[Aqui, faça uma breve análise do incômodo principal da usuária, como ela se sente com o corpo, como está a alimentação e a prática de atividade física, baseado nas respostas dela.]\n\n"
            "**Pilar 2: Suas Barreiras e Padrões Identificados**\n[Com base nas tentativas anteriores, emoções sentidas e padrões percebidos pela usuária, destaque as principais barreiras e padrões que podem estar atrapalhando seu progresso.]\n\n"
            "**Pilar 3: Clareza de Objetivo e Prontidão para Mudança**\n[Resuma o desejo/objetivo realista da usuária para os próximos meses e o que ela se mostrou disposta a mudar, indicando sua prontidão para a ação.]"
    *   Este laudo é um resumo inicial. Evite promessas exageradas.

4.  SOLICITAÇÃO DE CONTATO PARA ENVIO DO PDF:
    *   Imediatamente após apresentar o texto do laudo, diga:
        "Este laudo é um ponto de partida valioso! A Bruna pode te ajudar a aprofundar essa análise e criar um plano totalmente personalizado para você.\n\nPara que possamos te enviar este Laudo Corpo e Mente completo em formato PDF e para que a Bruna possa, se você desejar, entrar em contato para discutir seus próximos passos, por favor, informe seu nome completo e seu melhor contato (WhatsApp com DDD ou e-mail válido):"

5.  FINALIZAÇÃO DA CONVERSA PELA IA:
    *   Depois de pedir o nome e contato, sua parte principal está concluída. Você pode finalizar com uma mensagem encorajadora como: "Excelente! Assim que você preencher seus dados abaixo, daremos o próximo passo. Lembre-se, a jornada de transformação é poderosa e você não precisa trilhá-la sozinha. A Bruna está pronta para te guiar!"
    *   NÃO processe o nome ou contato que a usuária digitar no chat. O frontend cuidará da coleta desses dados através de campos específicos. Apenas peça as informações.

Adapte sua linguagem para ser acolhedora e compreensiva, especialmente ao lidar com as dores e frustrações que a usuária pode expressar.
Lembre-se: o objetivo é coletar informações para o diagnóstico, gerar o texto do laudo e solicitar o contato para o envio.
`;
  
  const systemInstruction: Part = { text: systemInstructionText };
  
  return ai.chats.create({
    model: model,
    config: {
        systemInstruction: systemInstruction,
    },
  });
};

export const sendMessageToChatStream = async (chat: Chat, message: string) => {
  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. Cannot send message.");
  }
  return chat.sendMessageStream({ message });
};

export const parseJsonFromGeminiResponse = <T,>(textResponse: string): T | null => {
  let jsonStr = textResponse.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", textResponse);
    return null;
  }
};
