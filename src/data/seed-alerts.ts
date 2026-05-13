import type { Alert } from '@/types/transit';

export const ALERTS: Alert[] = [
  {
    alert_id: 'A001',
    title: 'LPTRP Enforcement Reroute — Iznart Street',
    body: 'Selected units using Iznart loading zones may be redirected to alternate bays during CTTMO enforcement operations. Expect brief waits at City Proper stops.',
    severity: 'warning',
    affected_routes: ['R01', 'R02', 'R03', 'R07', 'R08'],
    affected_stops: ['STP_IZNART', 'STP_CITY_HALL'],
    starts_at: '2026-05-13T06:00:00',
    source: 'CTTMO Iloilo City',
  },
  {
    alert_id: 'A002',
    title: 'Late-Night Frequency Reduction — Mohon Corridor',
    body: 'Mohon to City Proper routes (R02, R09) reduce to 30-minute intervals after 9:00 PM daily until further notice.',
    severity: 'info',
    affected_routes: ['R02', 'R09'],
    affected_stops: ['STP_MOHON', 'STP_LAPAZ_MKT'],
    starts_at: '2026-05-10T00:00:00',
    source: 'IlongGo! Service Monitor',
  },
  {
    alert_id: 'A003',
    title: 'Guimaras Ferry Service Reminder',
    body: 'Jordan Ferry Terminal services depart from Ortiz Wharf (Parola Port). Arrive at least 15 minutes early on weekends and holidays.',
    severity: 'info',
    affected_routes: ['R11'],
    affected_stops: ['STP_ORTIZ_WHARF'],
    starts_at: '2026-01-01T00:00:00',
    source: 'Iloilo City Port Authority',
  },
  {
    alert_id: 'A004',
    title: 'E-Bus Trial Service — R05 Festive Walk to City Proper',
    body: 'E-bus trial service (R05) is now operational along the Festive Walk to City Proper corridor. Units are air-conditioned and low-floor for accessibility.',
    severity: 'info',
    affected_routes: ['R05'],
    affected_stops: ['STP_FESTIVE_WALK', 'STP_SM_CITY', 'STP_CITY_HALL'],
    starts_at: '2026-04-01T00:00:00',
    source: 'Iloilo City LGU – CTTMO',
  },
];
