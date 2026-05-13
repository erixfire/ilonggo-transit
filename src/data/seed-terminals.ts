import type { Terminal } from '@/types/transit';

export const TERMINALS: Terminal[] = [
  {
    terminal_id: 'T01',
    name: 'Tagbak Terminal',
    lat: 10.7490, lng: 122.5350,
    routes_served: ['R01'],
    facilities: ['Covered waiting shed', 'Public toilet', 'Food stalls'],
    guimaras_link: false,
  },
  {
    terminal_id: 'T02',
    name: 'Ungka Terminal',
    lat: 10.7050, lng: 122.5270,
    routes_served: ['R03', 'R04'],
    facilities: ['Modern jeepney bays', 'Covered boarding zone'],
    guimaras_link: false,
  },
  {
    terminal_id: 'T03',
    name: 'Festive Walk Transport Hub',
    lat: 10.7160, lng: 122.5510,
    routes_served: ['R04', 'R05'],
    facilities: ['Air-conditioned waiting area', 'Digital info board', 'PWD access'],
    guimaras_link: false,
  },
  {
    terminal_id: 'T04',
    name: 'Ortiz Wharf / Parola Port',
    lat: 10.7170, lng: 122.5650,
    routes_served: ['R11'],
    facilities: ['Ferry boarding ramp', 'Ticketing booth', 'Covered waiting area'],
    guimaras_link: true,
  },
];
