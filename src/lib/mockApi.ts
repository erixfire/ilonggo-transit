/**
 * mockApi.ts — In-memory mock API layer for IlongGo!
 * Drop-in replacement layer: swap these functions for real
 * Cloudflare Pages Functions / Workers + D1 calls when ready.
 */
import { ROUTES } from '@/data/seed-routes';
import { STOPS } from '@/data/seed-stops';
import { ALERTS } from '@/data/seed-alerts';
import { TERMINALS } from '@/data/seed-terminals';
import { planTrip } from '@/lib/tripPlanner';
import { simulateVehicles } from '@/lib/vehicleSimulator';
import type { Route, Stop, TripPlan, Vehicle, Alert, Terminal } from '@/types/transit';

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

// GET /routes
export async function getRoutes(): Promise<Route[]> {
  await delay();
  return ROUTES;
}

// GET /routes/:id
export async function getRoute(id: string): Promise<Route | null> {
  await delay();
  return ROUTES.find(r => r.route_id === id) ?? null;
}

// GET /stops
export async function getStops(): Promise<Stop[]> {
  await delay();
  return STOPS;
}

// GET /stops/:id
export async function getStop(id: string): Promise<Stop | null> {
  await delay();
  return STOPS.find(s => s.stop_id === id) ?? null;
}

// GET /trip-plan?from=&to=
export async function getTripPlan(fromStopId: string, toStopId: string): Promise<TripPlan[]> {
  await delay(400);
  return planTrip(fromStopId, toStopId);
}

// GET /vehicles
export async function getVehicles(): Promise<Vehicle[]> {
  await delay();
  return simulateVehicles();
}

// GET /vehicles/:id
export async function getVehicle(id: string): Promise<Vehicle | null> {
  await delay();
  return simulateVehicles().find(v => v.vehicle_id === id) ?? null;
}

// GET /arrivals?stop_id=
export async function getArrivals(stopId: string): Promise<{ route_id: string; eta_minutes: number; vehicle_id: string }[]> {
  await delay(300);
  const vehicles = simulateVehicles();
  return vehicles
    .filter(v => v.next_stop_id === stopId)
    .map(v => ({
      route_id: v.route_id,
      eta_minutes: v.eta_next_stop_minutes,
      vehicle_id: v.vehicle_id,
    }))
    .sort((a, b) => a.eta_minutes - b.eta_minutes);
}

// GET /alerts
export async function getAlerts(): Promise<Alert[]> {
  await delay();
  return ALERTS;
}

// GET /terminals
export async function getTerminals(): Promise<Terminal[]> {
  await delay();
  return TERMINALS;
}
