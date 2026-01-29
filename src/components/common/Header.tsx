interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isAdmin: boolean;
  adminEnabled: boolean;
  currentUser: { name: string } | null;
  onLogout: () => void;
}

export default function Header({ activePage, setActivePage, isAdmin, adminEnabled, currentUser, onLogout }: HeaderProps) {

  return (
    <>
      <header className="bg-black text-white border-4 border-black shadow-lg" style={{ transform: 'rotate(-2deg)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => setActivePage('home')}
            className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
          >
            JOSÉ TADEU
          </div>

          {/* Menu Items */}
          <nav className="hidden md:flex gap-6">
            {[
              { id: 'home', label: 'INÍCIO' },
              { id: 'about', label: 'SOBRE' },
              { id: 'resume', label: 'CURRÍCULO' },
              { id: 'evolution', label: '🚀 EVOLUÇÃO' },
              { id: 'process', label: 'PROCESSO' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3 py-2 rounded border-2 transition ${
                  activePage === item.id
                    ? 'bg-white text-black border-white'
                    : 'border-white hover:bg-white hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Show KANBAN only if admin logged in */}
            {adminEnabled && isAdmin && (
              <button
                onClick={() => setActivePage('kanban')}
                className={`px-3 py-2 rounded border-2 transition ${
                  activePage === 'kanban'
                    ? 'bg-white text-black border-white'
                    : 'border-white hover:bg-white hover:text-black'
                }`}
              >
                KANBAN
              </button>
            )}
          </nav>

          {/* Right Side: Admin Button or Logout */}
          <div>
            {adminEnabled && !isAdmin ? (
              <button
                onClick={() => setActivePage('admin')}
                className="bg-red-600 text-white px-4 py-2 rounded border-2 border-white font-bold hover:bg-red-700 transition"
              >
                ADMIN
              </button>
            ) : adminEnabled && isAdmin ? (
              <div className="flex items-center gap-4">
                {currentUser?.name && <span className="text-sm">{currentUser.name}</span>}
                <button
                  onClick={onLogout}
                  className="bg-gray-700 text-white px-4 py-2 rounded border-2 border-white font-bold hover:bg-gray-800 transition"
                >
                  SAIR
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}
