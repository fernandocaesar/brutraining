
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Chat } from '@google/genai';
import { createAnamnesisChat, sendMessageToChatStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { sectionVariants, itemVariants, ANAMNESIS_QUESTIONS, WEBHOOK_URL_MAKE_ZAPI } from '../constants';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3.022 6.096a.75.75 0 00-.528.912l1.504 6.883c.064.292.296.524.588.588l6.883 1.504a.75.75 0 00.912-.528l4.574-10.598a.75.75 0 00-.528-.912L12.378 1.602zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
    <path d="M12.753 18.259A6 6 0 0017.25 12a5.993 5.993 0 00-1.096-3.483l2.251-2.251a.75.75 0 00-1.06-1.06L15.1 7.457A5.993 5.993 0 0012 6.75a6 6 0 00-5.464 9.172l-2.022 2.022a.75.75 0 001.06 1.06L7.83 17.17A5.993 5.993 0 0012 17.25c.39 0 .77-.037 1.147-.109l2.072 2.072a.75.75 0 001.06-1.06l-2.526-2.526z" />
  </svg>
);

const FormattedAiMessage: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="text-purple-700 font-semibold block my-2"> {/* Pilar titles are blocks */}
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}</React.Fragment>
        )
      )}
    </div>
  );
};

// Total de perguntas do diagnóstico (excluindo a saudação/confirmação inicial)
const TOTAL_DIAGNOSIS_QUESTIONS = ANAMNESIS_QUESTIONS.length;


export const AnamnesisChatPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<string[]>([]);
  const [isEvaluationComplete, setIsEvaluationComplete] = useState(false); // True when all 8 diagnosis questions answered
  const [showContactForm, setShowContactForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState(''); // WhatsApp or Email
  const [laudoText, setLaudoText] = useState(''); // To store AI generated laudo
  const [isSubmittingLaudo, setIsSubmittingLaudo] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0,0);
    try {
      const newChat = createAnamnesisChat();
      setChat(newChat);
      // Send an initial empty message to trigger the AI's first response (greeting + first question)
      handleSendMessageInternally(newChat, ""); 
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      setError("Erro ao iniciar o chat. Verifique a configuração da API KEY.");
    }
  }, []); 

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessageInternally = async (currentChat: Chat, textToSend: string) => {
    setIsLoading(true);
    setError(null);
    let currentAiMessage: ChatMessage = {
      id: (Date.now() + Math.random()).toString(),
      text: '',
      sender: 'ai',
      timestamp: new Date(),
    };
    // Add placeholder for AI response immediately
    setMessages(prev => [...prev, currentAiMessage]);

    try {
      const stream = await sendMessageToChatStream(currentChat, textToSend);
      let accumulatedText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        accumulatedText += chunkText;
        // Update the AI message in a non-mutating way
        setMessages(prev => prev.map(msg => 
            msg.id === currentAiMessage.id ? { ...msg, text: accumulatedText } : msg
        ));
      }
      
      // After AI finishes, check if it's asking for contact info
      if (accumulatedText.includes("nome completo e seu melhor contato")) {
         setLaudoText(accumulatedText); // Store the laudo text
         setShowContactForm(true);
         setIsEvaluationComplete(true); // Mark evaluation as complete
      }

    } catch (e) {
      console.error("Error sending message to Gemini:", e);
      setError("Desculpe, ocorreu um erro ao comunicar com a assistente. Tente novamente.");
      setMessages(prev => prev.map(msg => 
        msg.id === currentAiMessage.id ? { ...msg, text: "Desculpe, ocorreu um erro. Tente novamente." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };


  const handleUserInputSubmit = () => {
    if (!chat || !userInput.trim()) return;

    const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: userInput,
        sender: 'user',
        timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    if (!isEvaluationComplete) {
        setAnswers(prevAns => [...prevAns, userInput]);
    }
    
    const textForAI = userInput;
    setUserInput('');
    handleSendMessageInternally(chat, textForAI);
  };
  
  const handleLaudoSubmission = async () => {
    if (!userName.trim() || !userContact.trim()) {
      setSubmissionMessage("Por favor, preencha seu nome e contato.");
      return;
    }
    setIsSubmittingLaudo(true);
    setSubmissionMessage("Enviando seu laudo...");

    const userAnswersMapped: Record<string, string> = {};
    ANAMNESIS_QUESTIONS.forEach((question, index) => {
        userAnswersMapped[`pergunta_${index + 1}`] = answers[index] || "Não respondida";
    });

    const payload = {
      nome: userName,
      contato: userContact, // WhatsApp ou Email
      respostas: userAnswersMapped,
      laudoGeradoPelaIA: laudoText, // The text generated by AI, includes the 3 pillars
      dataHora: new Date().toISOString(),
    };

    console.log("Payload para Webhook:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(WEBHOOK_URL_MAKE_ZAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionMessage("Laudo e informações enviados com sucesso! Em breve você receberá o PDF.");
        // Consider disabling the form or redirecting
      } else {
        const errorData = await response.text();
        console.error("Webhook error data:", errorData);
        setSubmissionMessage(`Erro ao enviar o laudo (HTTP ${response.status}). Tente novamente ou contate o suporte.`);
      }
    } catch (error) {
      console.error("Erro na chamada do webhook:", error);
      setSubmissionMessage("Erro crítico ao enviar o laudo. Verifique sua conexão ou contate o suporte.");
    } finally {
      setIsSubmittingLaudo(false);
    }
  };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-6 md:py-10 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center px-4"
      style={{ minHeight: 'calc(100vh - 5rem)'}} // Adjust based on Navbar height
    >
      <motion.div 
        variants={itemVariants} 
        className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl w-full max-w-2xl flex flex-col overflow-hidden"
        style={{height: 'calc(100vh - 7rem)', maxHeight: '800px'}} // Adjust max height
      >
        <header className="p-4 sm:p-6 border-b border-slate-300">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800">
            Diagnóstico Corpo & Mente
          </h1>
          <p className="text-center text-slate-600 mt-1 text-sm sm:text-base">Converse com nossa IA para sua avaliação inicial.</p>
        </header>

        <div ref={chatContainerRef} className="flex-grow p-4 sm:p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-100">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-2 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full p-1.5 sm:p-2 self-start shadow-md">
                  <AiIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
              <div
                className={`max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl shadow-md text-sm sm:text-base ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-900 rounded-br-none'
                    : 'bg-indigo-100 text-slate-800 rounded-bl-none'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <FormattedAiMessage text={msg.text} />
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
                <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-slate-700' : 'text-slate-500'} text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.sender === 'user' && (
                 <div className="flex-shrink-0 bg-amber-500 text-slate-900 rounded-full p-1.5 sm:p-2 self-start shadow-md">
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && messages[messages.length -1]?.sender === 'user' && ( // Show thinking only if user sent last message
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-3 justify-start"
            >
              <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full p-2 self-start shadow-md">
                <AiIcon className="w-5 h-5" />
              </div>
              <div className="max-w-[70%] p-4 rounded-2xl shadow-md bg-indigo-100 text-slate-800 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {error && <p className="p-4 text-center text-red-600 bg-red-100 border-t border-slate-300">{error}</p>}

        {showContactForm ? (
          <div className="p-4 border-t border-slate-300 bg-slate-50">
            <h3 className="text-center font-semibold text-indigo-700 mb-3">Informe seus dados para receber o Laudo PDF:</h3>
            <input 
              type="text" 
              placeholder="Nome Completo" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 mb-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
            <input 
              type="text" 
              placeholder="WhatsApp (com DDD) ou E-mail" 
              value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              className="w-full p-3 mb-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
            <button
              onClick={handleLaudoSubmission}
              disabled={isSubmittingLaudo}
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400 transition-colors duration-200 shadow-md"
            >
              {isSubmittingLaudo ? "Enviando..." : "Confirmar e Enviar Laudo"}
            </button>
            {submissionMessage && <p className={`text-center mt-3 text-sm ${submissionMessage.includes("Erro") ? 'text-red-600' : 'text-green-700'}`}>{submissionMessage}</p>}
          </div>
        ) : (
          <footer className="p-4 border-t border-slate-300 bg-slate-50">
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleUserInputSubmit()}
                placeholder={isLoading ? "Aguarde a resposta..." : "Digite sua mensagem..."}
                className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-shadow"
                disabled={isLoading || !chat || showContactForm}
                aria-label="Sua resposta para a assistente IA"
              />
              <button
                onClick={handleUserInputSubmit}
                disabled={isLoading || !userInput.trim() || !chat || showContactForm}
                className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 transition-colors duration-200 shadow-md disabled:shadow-none"
                aria-label="Enviar mensagem"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </footer>
        )}
      </motion.div>
    </motion.div>
  );
};
