import type { TripPlan } from '@/types/transit';
import { RouteModeBadge } from './RouteModeBadge';
import { formatFare } from '@/lib/fare';

interface Props {
  plan: TripPlan;
  onClick?: () => void;
  isFirst?: boolean;
}

export function TripCard({ plan, onClick, isFirst }: Props) {
  const firstLeg = plan.legs.find(l => l.leg_type === 'transit');
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-3xl bg-white dark:bg-slate-800 shadow-card p-4 space-y-3 transition hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {plan.legs
            .filter(l => l.leg_type === 'transit')
            .map(leg => (
              <RouteModeBadge
                key={leg.route_id}
                type={leg.route_type!}
                code={leg.route_code}
              />
            ))}
        </div>
        {isFirst && (
          <span className="text-xs font-semibold text-civic-teal dark:text-teal-300">Best option</span>
        )}
      </div>

      {firstLeg && (
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {firstLeg.route_name}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {plan.total_duration_minutes} min
          </div>
          ETA
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {formatFare(plan.total_fare)}
          </div>
          Fare
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {plan.transfers}
          </div>
          Transfers
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {plan.total_stops}
          </div>
          Stops
        </div>
      </div>
    </button>
  );
}
