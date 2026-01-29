import React, { useState } from 'react';
import { storage } from '../services/storage';
import { User } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = storage.login(email, password);
      if (user) {
        onAuthSuccess(user);
      } else {
        setError('E-MAIL OU SENHA INVÁLIDOS.');
      }
    } else {
      if (!name || !email || !password) {
        setError('PREENCHA TODOS OS CAMPOS.');
        return;
      }
      const success = storage.registerUser({
        id: Math.random().toString(36).substr(2, 9),
        name: name.toUpperCase(),
        email: email.toLowerCase(),
        password
      });
      if (success) {
        const user = storage.login(email, password);
        if (user) onAuthSuccess(user);
      } else {
        setError('ESTE E-MAIL JÁ EXISTE.');
      }
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 pt-20">
      <div className="bg-white w-full max-w-md p-10 border-4 border-black shadow-brutalLarge animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="text-center mb-10">
            <div className={`inline-block border-4 border-black px-8 py-3 mb-6 shadow-brutal ${isLogin ? 'bg-brutal-yellow' : 'bg-brutal-pink'} rotate-2`}>
                <h2 className="text-4xl font-black uppercase tracking-tighter">{isLogin ? 'ENTRAR' : 'CADASTRAR'}</h2>
            </div>
          <p className="text-black text-xs uppercase tracking-[0.2em] font-black">ACESSO À ÁREA RESTRITA</p>
        </div>

        {error && (
          <div className="bg-brutal-red border-4 border-black text-white text-xs p-4 mb-8 text-center font-black uppercase shadow-brutal">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black uppercase text-black mb-2 ml-1">NOME COMPLETO</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-bold focus:outline-none focus:bg-brutal-blueLight"
                placeholder="SEU NOME AQUI"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-black uppercase text-black mb-2 ml-1">E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-bold focus:outline-none focus:bg-brutal-yellow"
              placeholder="SEU@EMAIL.COM"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-black mb-2 ml-1">SENHA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-bold focus:outline-none focus:bg-brutal-pink"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="brutal-btn w-full bg-black text-white font-black py-6 text-lg uppercase tracking-[0.3em] shadow-brutal mt-4"
          >
            {isLogin ? 'ACESSO' : 'CRIAR'} ★
          </button>
        </form>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-black uppercase tracking-widest text-black hover:bg-brutal-yellow border-2 border-black px-4 py-2 transition-all shadow-brutalHover"
          >
            {isLogin ? 'NÃO TENHO CONTA → CADASTRAR' : 'JÁ SOU MEMBRO → ENTRAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;