/**
 * vehicleSimulator.ts — Simulated live vehicle positions
 * Generates deterministic vehicle positions that change each call
 * to simulate real GPS movement. Swap with live Cloudflare KV/WebSocket when available.
 */
import { ROUTES } from '@/data/seed-routes';
import { STOPS } from '@/data/seed-stops';
import type { Vehicle } from '@/types/transit';

const SEED_VEHICLES: { vehicle_id: string; route_id: string; plate: string }[] = [
  { vehicle_id: 'MJ-001', route_id: 'R01', plate: 'MVJ-1021' },
  { vehicle_id: 'MJ-002', route_id: 'R01', plate: 'MVJ-1034' },
  { vehicle_id: 'MJ-003', route_id: 'R02', plate: 'MVJ-2018' },
  { vehicle_id: 'MJ-004', route_id: 'R03', plate: 'MVJ-3011' },
  { vehicle_id: 'MJ-005', route_id: 'R03', plate: 'MVJ-3022' },
  { vehicle_id: 'MJ-006', route_id: 'R04', plate: 'MVJ-4007' },
  { vehicle_id: 'EB-001', route_id: 'R05', plate: 'NGV-5001' },
  { vehicle_id: 'TJ-001', route_id: 'R06', plate: 'JKL-6121' },
  { vehicle_id: 'TJ-002', route_id: 'R07', plate: 'AAB-7034' },
  { vehicle_id: 'TJ-003', route_id: 'R08', plate: 'PQR-8045' },
  { vehicle_id: 'MJ-007', route_id: 'R09', plate: 'MVJ-9014' },
];

export function simulateVehicles(): Vehicle[] {
  const now = Date.now();
  return SEED_VEHICLES.map(seed => {
    const route = ROUTES.find(r => r.route_id === seed.route_id);
    if (!route) return null;
    const stopCount = route.stops.length;
    const t = (now / 1000 / 45 + SEED_VEHICLES.indexOf(seed) * 0.4) % 1;
    const stopIdx = Math.floor(t * (stopCount - 1));
    const nextIdx = Math.min(stopIdx + 1, stopCount - 1);
    const stop = STOPS.find(s => s.stop_id === route.stops[nextIdx]);
    const jitter = (Math.sin(now / 5000 + stopIdx) * 0.002);
    const baseLat = route.coordinates[Math.min(stopIdx, route.coordinates.length - 1)][0];
    const baseLng = route.coordinates[Math.min(stopIdx, route.coordinates.length - 1)][1];
    const eta = Math.max(1, Math.round((1 - (t * stopCount - stopIdx)) * 2.5));
    return {
      vehicle_id: seed.vehicle_id,
      plate: seed.plate,
      route_id: seed.route_id,
      status: 'in_service' as const,
      lat: baseLat + jitter,
      lng: baseLng + jitter,
      speed_kmh: 18 + Math.floor(Math.sin(now / 3000 + stopIdx) * 8),
      heading: Math.floor((stopIdx / stopCount) * 360),
      next_stop_id: stop?.stop_id ?? route.stops[nextIdx],
      eta_next_stop_minutes: eta,
      last_updated: new Date().toISOString(),
    };
  }).filter(Boolean) as Vehicle[];
}
