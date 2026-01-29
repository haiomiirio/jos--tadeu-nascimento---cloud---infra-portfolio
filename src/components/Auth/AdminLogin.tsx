
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (pass: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="max-w-xs mx-auto text-center py-20">
      <h3 className="text-xl font-bold mb-6">Acesso Administrativo</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl text-white font-bold transition-all">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
