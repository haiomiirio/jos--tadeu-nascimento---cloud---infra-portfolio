import { useState } from 'react';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isAdmin: boolean;
  adminEnabled: boolean;
  currentUser: { name: string } | null;
  onLogout: () => void;
}

export default function Header({ activePage, setActivePage, isAdmin, adminEnabled, currentUser, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'INÍCIO' },
    { id: 'about', label: 'SOBRE' },
    { id: 'resume', label: 'CURRÍCULO' },
    { id: 'projects', label: '💼 PROJETOS' },
    { id: 'portfolio', label: '💻 PORTFÓLIO' },
  ];

  const handleMenuClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-black text-white border-4 border-black shadow-lg" style={{ transform: 'rotate(-2deg)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleMenuClick('home')}
            className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
          >
            JOSÉ TADEU
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6">
            {menuItems.map(item => (
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
          </nav>

          {/* Right Side: Admin/Logout + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Admin Button/Logout (Desktop) */}
            <div className="hidden md:block">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border-2 border-white rounded hover:bg-white hover:text-black transition"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t-4 border-white">
            <nav className="px-4 py-4 space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded border-2 transition ${
                    activePage === item.id
                      ? 'bg-white text-black border-white'
                      : 'border-white hover:bg-white hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Admin/Logout */}
              {adminEnabled && !isAdmin && (
                <button
                  onClick={() => handleMenuClick('admin')}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded border-2 border-white font-bold hover:bg-red-700 transition"
                >
                  ADMIN
                </button>
              )}
              {adminEnabled && isAdmin && (
                <div className="space-y-2">
                  {currentUser?.name && (
                    <div className="text-center text-sm py-2">{currentUser.name}</div>
                  )}
                  <button
                    onClick={onLogout}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded border-2 border-white font-bold hover:bg-gray-800 transition"
                  >
                    SAIR
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
