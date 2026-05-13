// ─── Transport mode types ────────────────────────────────────────────────────
export type RouteType =
  | 'traditional_jeepney'
  | 'modern_jeepney'
  | 'ebus'
  | 'loop'
  | 'ferry_link';

export type StopType = 'terminal' | 'regular' | 'transfer' | 'port';

export type VehicleStatus = 'in_service' | 'idle' | 'breakdown' | 'off_duty';

export type AlertSeverity = 'info' | 'warning' | 'critical';

// ─── Route ───────────────────────────────────────────────────────────────────
export interface Route {
  route_id: string;
  route_code: string;
  route_name: string;
  route_type: RouteType;
  origin: string;
  destination: string;
  via?: string;
  coordinates: [number, number][]; // [lat, lng] pairs
  stops: string[];                  // stop_id list in order
  operating_hours: { start: string; end: string };
  frequency_minutes: number;
  base_fare: number;
  max_fare: number;
  status: 'active' | 'limited' | 'suspended';
  color: string;                    // hex for map/UI
}

// ─── Stop ────────────────────────────────────────────────────────────────────
export interface Stop {
  stop_id: string;
  stop_name: string;
  lat: number;
  lng: number;
  stop_type: StopType;
  served_routes: string[];          // route_id list
  landmarks: string[];
  accessibility: string;
  barangay?: string;
}

// ─── Trip plan ───────────────────────────────────────────────────────────────
export interface TripLeg {
  leg_type: 'transit' | 'walk';
  route_id?: string;
  route_code?: string;
  route_name?: string;
  route_type?: RouteType;
  route_color?: string;
  from_stop: string;
  to_stop: string;
  from_stop_name: string;
  to_stop_name: string;
  stop_sequence: Stop[];
  duration_minutes: number;
  fare: number;
  distance_m: number;
}

export interface TripPlan {
  plan_id: string;
  from: string;
  to: string;
  legs: TripLeg[];
  total_duration_minutes: number;
  total_fare: number;
  transfers: number;
  total_stops: number;
  label: 'fastest' | 'cheapest' | 'least_transfers' | 'tourist_friendly';
}

// ─── Vehicle ─────────────────────────────────────────────────────────────────
export interface Vehicle {
  vehicle_id: string;
  plate: string;
  route_id: string;
  status: VehicleStatus;
  lat: number;
  lng: number;
  speed_kmh: number;
  heading: number;
  next_stop_id: string;
  eta_next_stop_minutes: number;
  last_updated: string;
}

// ─── Alert ───────────────────────────────────────────────────────────────────
export interface Alert {
  alert_id: string;
  title: string;
  body: string;
  severity: AlertSeverity;
  affected_routes: string[];
  affected_stops: string[];
  starts_at: string;
  expires_at?: string;
  source: string;
}

// ─── Terminal ────────────────────────────────────────────────────────────────
export interface Terminal {
  terminal_id: string;
  name: string;
  lat: number;
  lng: number;
  routes_served: string[];
  facilities: string[];
  guimaras_link: boolean;
}

// ─── Fare rule ───────────────────────────────────────────────────────────────
export interface FareRule {
  route_id: string;
  base_fare: number;
  per_km_rate: number;
  minimum_km: number;
  student_discount: number;
  senior_discount: number;
  pwd_discount: number;
}

// ─── Favorites / recents ─────────────────────────────────────────────────────
export interface SavedPlace {
  id: string;
  label: string;
  stop_id?: string;
  lat: number;
  lng: number;
  type: 'home' | 'work' | 'school' | 'custom';
}

export interface RecentSearch {
  id: string;
  from_label: string;
  to_label: string;
  from_lat: number;
  from_lng: number;
  to_lat: number;
  to_lng: number;
  searched_at: string;
}
