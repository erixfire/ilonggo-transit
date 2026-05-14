CREATE TABLE IF NOT EXISTS routes (
  route_id        TEXT PRIMARY KEY,
  route_name      TEXT NOT NULL,
  route_type      TEXT NOT NULL CHECK (route_type IN ('jeepney','modern_jeep','ebus','loop','ferry_link')),
  origin          TEXT NOT NULL,
  destination     TEXT NOT NULL,
  stops           TEXT NOT NULL,
  coordinates     TEXT NOT NULL,
  operating_start TEXT NOT NULL,
  operating_end   TEXT NOT NULL,
  frequency_min   INTEGER NOT NULL DEFAULT 15,
  base_fare       REAL NOT NULL DEFAULT 15,
  fare_per_km     REAL NOT NULL DEFAULT 1.5,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','limited','suspended')),
  color           TEXT NOT NULL DEFAULT '#10b981',
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS stops (
  stop_id        TEXT PRIMARY KEY,
  stop_name      TEXT NOT NULL,
  lat            REAL NOT NULL,
  lng            REAL NOT NULL,
  stop_type      TEXT NOT NULL CHECK (stop_type IN ('terminal','major','regular')),
  served_routes  TEXT NOT NULL,
  landmarks      TEXT NOT NULL,
  accessibility  TEXT NOT NULL DEFAULT '',
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alerts (
  alert_id        TEXT PRIMARY KEY,
  level           TEXT NOT NULL CHECK (level IN ('info','warning','critical')),
  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  affected_routes TEXT NOT NULL,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at      TEXT
);

CREATE TABLE IF NOT EXISTS vehicles (
  vehicle_id   TEXT PRIMARY KEY,
  route_id     TEXT NOT NULL REFERENCES routes(route_id),
  plate        TEXT NOT NULL,
  type         TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'idle',
  lat          REAL,
  lng          REAL,
  speed_kph    REAL DEFAULT 0,
  heading      REAL DEFAULT 0,
  next_stop_id TEXT,
  eta_next_min INTEGER DEFAULT 0,
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS favorites (
  id             TEXT PRIMARY KEY,
  label          TEXT NOT NULL,
  from_stop      TEXT NOT NULL,
  to_stop        TEXT NOT NULL,
  preferred_mode TEXT,
  user_id        TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS recent_searches (
  id          TEXT PRIMARY KEY,
  from_stop   TEXT NOT NULL,
  to_stop     TEXT NOT NULL,
  user_id     TEXT,
  searched_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_routes_status ON routes(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_route ON vehicles(route_id);
CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_fav_user ON favorites(user_id);
