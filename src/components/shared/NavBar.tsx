import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/app', label: 'Home', icon: '🏠' },
  { path: '/app/search', label: 'Search', icon: '🔍' },
  { path: '/app/tracking', label: 'Live', icon: '📍' },
  { path: '/app/alerts', label: 'Alerts', icon: '🔔' },
  { path: '/app/saved', label: 'Saved', icon: '❤️' },
];

export function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur max-w-[430px] mx-auto">
      <div className="flex items-center">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.path || (item.path !== '/app' && pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-semibold transition ${
                active
                  ? 'text-civic-teal dark:text-teal-300'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
