/**
 * fare.ts — Iloilo transit fare estimation
 * Based on LTFRB minimum fare structure and LPTRP rationalized routes.
 */

export const BASE_FARE = 15; // PHP minimum fare (traditional jeepney)
export const EBUS_BASE_FARE = 17;
export const PER_KM_RATE = 1.80; // PHP per km after minimum distance
export const MINIMUM_KM = 4;

export function estimateFare(baseFare: number, distanceMeters: number): number {
  const km = distanceMeters / 1000;
  if (km <= MINIMUM_KM) return baseFare;
  const extra = Math.ceil((km - MINIMUM_KM) * PER_KM_RATE);
  return Math.min(baseFare + extra, baseFare + 15); // cap at base + 15
}

export function applyDiscount(fare: number, type: 'student' | 'senior' | 'pwd' | 'none'): number {
  if (type === 'none') return fare;
  const discounted = Math.floor(fare * 0.80); // 20% discount
  return Math.max(discounted, 1);
}

export function formatFare(amount: number): string {
  return `₱${amount.toFixed(0)}`;
}
