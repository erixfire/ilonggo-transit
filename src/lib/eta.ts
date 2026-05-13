/**
 * eta.ts — Simulated ETA calculation per stop
 * Returns minutes from now for each stop along a route.
 */

const STOP_INTERVAL_MIN = 2.5; // avg minutes between consecutive stops

export function etaForStops(stopIds: string[], vehicleCurrentStopIndex: number): Record<string, number> {
  const etas: Record<string, number> = {};
  stopIds.forEach((id, i) => {
    const diff = i - vehicleCurrentStopIndex;
    if (diff >= 0) {
      etas[id] = Math.round(diff * STOP_INTERVAL_MIN);
    }
  });
  return etas;
}

export function etaLabel(minutes: number): string {
  if (minutes <= 1) return 'Arriving';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
