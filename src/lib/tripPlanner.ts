/**
 * tripPlanner.ts — Simple origin→destination matcher
 * Uses stop-to-route adjacency to find direct and 1-transfer options.
 * Swap with GTFS routing engine when real data is available.
 */
import { ROUTES } from '@/data/seed-routes';
import { STOPS } from '@/data/seed-stops';
import { estimateFare } from '@/lib/fare';
import type { TripPlan, TripLeg } from '@/types/transit';

function stopIndex(routeStops: string[], stopId: string): number {
  return routeStops.indexOf(stopId);
}

function stopsOnRoute(routeId: string, fromStop: string, toStop: string) {
  const route = ROUTES.find(r => r.route_id === routeId);
  if (!route) return null;
  const fi = stopIndex(route.stops, fromStop);
  const ti = stopIndex(route.stops, toStop);
  if (fi === -1 || ti === -1 || fi >= ti) return null;
  return route.stops.slice(fi, ti + 1);
}

function buildLeg(routeId: string, fromId: string, toId: string): TripLeg | null {
  const route = ROUTES.find(r => r.route_id === routeId);
  if (!route) return null;
  const stopIds = stopsOnRoute(routeId, fromId, toId);
  if (!stopIds) return null;
  const stopObjs = stopIds.map(id => STOPS.find(s => s.stop_id === id)).filter(Boolean) as any[];
  const fromStop = STOPS.find(s => s.stop_id === fromId)!;
  const toStop = STOPS.find(s => s.stop_id === toId)!;
  const durationMin = Math.max(5, stopIds.length * 2 + Math.floor(Math.random() * 4));
  const distanceM = stopIds.length * 700;
  return {
    leg_type: 'transit',
    route_id: routeId,
    route_code: route.route_code,
    route_name: route.route_name,
    route_type: route.route_type,
    route_color: route.color,
    from_stop: fromId,
    to_stop: toId,
    from_stop_name: fromStop?.stop_name ?? fromId,
    to_stop_name: toStop?.stop_name ?? toId,
    stop_sequence: stopObjs,
    duration_minutes: durationMin,
    fare: estimateFare(route.base_fare, distanceM),
    distance_m: distanceM,
  };
}

export function planTrip(fromStopId: string, toStopId: string): TripPlan[] {
  const plans: TripPlan[] = [];

  // Direct routes
  for (const route of ROUTES) {
    const leg = buildLeg(route.route_id, fromStopId, toStopId);
    if (!leg) continue;
    plans.push({
      plan_id: `direct-${route.route_id}`,
      from: fromStopId,
      to: toStopId,
      legs: [leg],
      total_duration_minutes: leg.duration_minutes + 3,
      total_fare: leg.fare,
      transfers: 0,
      total_stops: leg.stop_sequence.length,
      label: 'fastest',
    });
  }

  // 1-transfer routes via transfer stops
  const transferStops = STOPS.filter(s => s.stop_type === 'transfer');
  for (const via of transferStops) {
    for (const r1 of ROUTES) {
      for (const r2 of ROUTES) {
        if (r1.route_id === r2.route_id) continue;
        const leg1 = buildLeg(r1.route_id, fromStopId, via.stop_id);
        const leg2 = buildLeg(r2.route_id, via.stop_id, toStopId);
        if (!leg1 || !leg2) continue;
        const total = leg1.duration_minutes + leg2.duration_minutes + 5;
        const fare = leg1.fare + leg2.fare;
        plans.push({
          plan_id: `transfer-${r1.route_id}-${r2.route_id}-${via.stop_id}`,
          from: fromStopId,
          to: toStopId,
          legs: [leg1, leg2],
          total_duration_minutes: total,
          total_fare: fare,
          transfers: 1,
          total_stops: leg1.stop_sequence.length + leg2.stop_sequence.length,
          label: fare < 20 ? 'cheapest' : 'least_transfers',
        });
      }
    }
  }

  // Sort: direct first, then by duration
  return plans
    .sort((a, b) => a.transfers - b.transfers || a.total_duration_minutes - b.total_duration_minutes)
    .slice(0, 5);
}
