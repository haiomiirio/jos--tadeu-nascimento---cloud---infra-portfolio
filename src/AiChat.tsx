import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, PERSONAL_DATA } from './constants';
import { Message } from './types';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `OLÁ! SOU O ASSISTENTE DO ${PERSONAL_DATA.name.toUpperCase()}. O QUE VOCÊ QUER SABER SOBRE AWS OU INFRA?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-chat', handleToggle);
    return () => window.removeEventListener('toggle-chat', handleToggle);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.toUpperCase() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: input.toUpperCase() }] }
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT.toUpperCase(),
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const aiText = (response.text || 'OPA, TIVE UM ERRO TÉCNICO. PERGUNTE DE NOVO!').toUpperCase();
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'ERRO DE CONEXÃO. TENTE EM ALGUNS INSTANTES.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-brutal-yellow border-4 border-black flex items-center justify-center shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        aria-label={isOpen ? "Fechar chat de suporte" : "Abrir chat de suporte"}
      >
        <svg className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-32 right-10 z-[100] w-[calc(100vw-4rem)] md:w-96 h-[550px] bg-white border-4 border-black flex flex-col overflow-hidden shadow-brutalLarge animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-6 border-b-4 border-black bg-brutal-blue flex items-center gap-4">
            <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center font-black text-black text-xl rotate-3">JT</div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tighter leading-none">SUPORTE BOT</h3>
              <p className="text-[10px] bg-black text-white px-2 py-0.5 mt-1 inline-block font-black uppercase tracking-widest">IA ATIVA</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto border-2 border-black bg-white p-1 hover:bg-brutal-red transition-all" aria-label="Fechar chat">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-brutal-bg">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-5 py-4 border-4 border-black text-xs font-bold leading-tight shadow-brutal ${
                  msg.role === 'user' ? 'bg-brutal-yellow' : 'bg-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-4 border-black px-4 py-2 text-[10px] font-black uppercase animate-pulse">
                  PROCESSANDO...
                </div>
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="p-4 bg-white border-t-4 border-black flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sua pergunta aqui..."
              className="flex-1 bg-brutal-bg border-4 border-black px-4 py-3 text-xs font-black focus:outline-none focus:bg-brutal-blueLight"
            />
            <button type="submit" disabled={isLoading} className="bg-brutal-yellow border-4 border-black p-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all" aria-label="Enviar mensagem">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiChat;