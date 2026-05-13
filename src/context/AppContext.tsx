import { createContext, useContext, useState, ReactNode } from 'react';
import type { RecentSearch, SavedPlace } from '@/types/transit';

interface AppContextValue {
  savedPlaces: SavedPlace[];
  recentSearches: RecentSearch[];
  activeRouteFilter: string[];
  setActiveRouteFilter: (f: string[]) => void;
  addRecentSearch: (s: RecentSearch) => void;
  addSavedPlace: (p: SavedPlace) => void;
  removeSavedPlace: (id: string) => void;
}

const AppContext = createContext<AppContextValue>({
  savedPlaces: [],
  recentSearches: [],
  activeRouteFilter: [],
  setActiveRouteFilter: () => {},
  addRecentSearch: () => {},
  addSavedPlace: () => {},
  removeSavedPlace: () => {},
});

const SEED_SAVED: SavedPlace[] = [
  { id: 'home', label: 'Home (Jaro)', stop_id: 'STP_JARO_PLAZA', lat: 10.7261, lng: 122.5478, type: 'home' },
  { id: 'work', label: 'City Hall', stop_id: 'STP_CITY_HALL', lat: 10.7220, lng: 122.5595, type: 'work' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedPlaces, setSaved] = useState<SavedPlace[]>(SEED_SAVED);
  const [recentSearches, setRecents] = useState<RecentSearch[]>([]);
  const [activeRouteFilter, setActiveRouteFilter] = useState<string[]>([]);

  const addRecentSearch = (s: RecentSearch) =>
    setRecents(prev => [s, ...prev.filter(r => r.id !== s.id)].slice(0, 10));

  const addSavedPlace = (p: SavedPlace) =>
    setSaved(prev => [...prev.filter(s => s.id !== p.id), p]);

  const removeSavedPlace = (id: string) =>
    setSaved(prev => prev.filter(s => s.id !== id));

  return (
    <AppContext.Provider value={{
      savedPlaces,
      recentSearches,
      activeRouteFilter,
      setActiveRouteFilter,
      addRecentSearch,
      addSavedPlace,
      removeSavedPlace,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
