import React, { useState } from 'react';
import { EvolutionStory } from '../types';

interface EvolutionPageProps {
  stories: EvolutionStory[];
  onAddStory: (story: Omit<EvolutionStory, 'id' | 'createdAt'>) => void;
  onDeleteStory: (id: string) => void;
}

const EvolutionPage: React.FC<EvolutionPageProps> = ({ stories, onAddStory, onDeleteStory }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    story: '',
    area: 'Pessoal',
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.title && formData.story) {
      onAddStory(formData);
      setFormData({ name: '', title: '', story: '', area: 'Pessoal' });
      setShowForm(false);
    }
  };

  const areas = ['Carreira', 'Saúde', 'Pessoal', 'Educação', 'Tecnologia', 'Outro'];

  const sortedStories = [...stories].sort((a, b) => b.createdAt - a.createdAt);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-4 border-black bg-brutal-blue p-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
          🚀 Evolução
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-700">
          Compartilhe sua jornada de crescimento
        </p>
      </div>

      {/* Form Section */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-brutal-yellow border-4 border-black p-6 font-black uppercase text-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none shadow-brutal transition-all"
          >
            + Compartilhar Sua História
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border-4 border-black bg-white p-8 space-y-6 shadow-brutal"
          >
            <div>
              <label className="block font-black uppercase text-xs mb-2 tracking-widest">
                Seu Nome
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Como você quer ser identificado?"
                className="w-full border-4 border-black px-4 py-3 font-bold text-sm focus:outline-none focus:bg-brutal-yellow"
              />
            </div>

            <div>
              <label className="block font-black uppercase text-xs mb-2 tracking-widest">
                Título da História
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Minha Jornada em Cloud Computing"
                className="w-full border-4 border-black px-4 py-3 font-bold text-sm focus:outline-none focus:bg-brutal-yellow"
              />
            </div>

            <div>
              <label className="block font-black uppercase text-xs mb-2 tracking-widest">
                Área (Opcional)
              </label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full border-4 border-black px-4 py-3 font-bold text-sm focus:outline-none focus:bg-brutal-yellow"
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-black uppercase text-xs mb-2 tracking-widest">
                Sua História
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Compartilhe sua experiência, desafios superados, aprendizados... Seja autêntico!"
                rows={6}
                className="w-full border-4 border-black px-4 py-3 font-bold text-sm focus:outline-none focus:bg-brutal-yellow resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-brutal-yellow border-4 border-black p-4 font-black uppercase text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all"
              >
                📤 Compartilhar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 border-4 border-black p-4 font-black uppercase text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all"
              >
                ✕ Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stories Grid */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-6 border-l-4 border-black pl-4">
          {sortedStories.length} {sortedStories.length === 1 ? 'História' : 'Histórias'} Compartilhadas
        </h2>

        {sortedStories.length === 0 ? (
          <div className="border-4 border-black bg-gray-50 p-12 text-center">
            <p className="font-black uppercase text-gray-600 mb-2">Nenhuma história ainda...</p>
            <p className="text-sm text-gray-500">Seja o primeiro a compartilhar sua evolução! 🌟</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedStories.map((story) => (
              <div
                key={story.id}
                className="border-4 border-black bg-white shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden"
              >
                <div className="bg-brutal-blue border-b-4 border-black p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-black text-lg uppercase leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-xs font-bold text-gray-700 mt-1">
                        por <span className="uppercase">{story.name}</span>
                      </p>
                    </div>
                    {story.area && (
                      <span className="bg-black text-white px-3 py-1 text-xs font-black whitespace-nowrap">
                        {story.area}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap mb-4">
                    {story.story}
                  </p>
                  <p className="text-xs text-gray-500 font-bold">
                    {formatDate(story.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteStory(story.id)}
                  className="w-full border-t-4 border-black bg-brutal-red hover:bg-red-400 p-3 font-black uppercase text-xs transition-colors"
                >
                  🗑️ Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvolutionPage;
