// Iloilo City geographic center
export const ILOILO_CENTER: [number, number] = [10.7202, 122.5621];
export const ILOILO_BOUNDS: [[number, number], [number, number]] = [
  [10.63, 122.48],
  [10.80, 122.65],
];
export const DEFAULT_ZOOM = 13;

// Transport mode display config
export const ROUTE_TYPE_CONFIG = {
  traditional_jeepney: {
    label: 'Traditional Jeepney',
    shortLabel: 'Jeep',
    color: '#f59e0b',
    bgClass: 'bg-amber-100 text-amber-700',
    dotClass: 'bg-amber-500',
  },
  modern_jeepney: {
    label: 'Modern Jeepney',
    shortLabel: 'Modern',
    color: '#10b981',
    bgClass: 'bg-emerald-100 text-emerald-700',
    dotClass: 'bg-emerald-500',
  },
  ebus: {
    label: 'E-Bus',
    shortLabel: 'E-Bus',
    color: '#3b82f6',
    bgClass: 'bg-blue-100 text-blue-700',
    dotClass: 'bg-blue-500',
  },
  loop: {
    label: 'Loop Service',
    shortLabel: 'Loop',
    color: '#a855f7',
    bgClass: 'bg-purple-100 text-purple-700',
    dotClass: 'bg-purple-500',
  },
  ferry_link: {
    label: 'Port / Ferry Link',
    shortLabel: 'Ferry',
    color: '#8b5cf6',
    bgClass: 'bg-violet-100 text-violet-700',
    dotClass: 'bg-violet-500',
  },
} as const;

export const FARE_BASE = 15;
export const STUDENT_DISCOUNT = 0.20;
export const SENIOR_PWD_DISCOUNT = 0.20;
