import type { Stop } from '@/types/transit';

interface Props {
  stop: Stop;
  isFirst?: boolean;
  isLast?: boolean;
  etaMinutes?: number;
  onClick?: () => void;
}

export function StopRow({ stop, isFirst, isLast, etaMinutes, onClick }: Props) {
  const dotColor = isFirst
    ? 'bg-civic-teal'
    : isLast
    ? 'bg-civic-teal2'
    : 'bg-slate-300 dark:bg-slate-600';

  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 w-full text-left py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-2xl transition active:scale-[0.98]"
    >
      <div className="flex flex-col items-center mt-1 flex-shrink-0">
        <span className={`h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${dotColor}`} />
        {!isLast && <span className="h-6 w-0.5 bg-slate-200 dark:bg-slate-700 mt-0.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
          {stop.stop_name}
        </div>
        {stop.landmarks.length > 0 && (
          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {stop.landmarks[0]}
          </div>
        )}
      </div>
      {etaMinutes !== undefined && (
        <span className="text-xs font-semibold text-civic-teal dark:text-teal-300 flex-shrink-0">
          {etaMinutes <= 1 ? 'Now' : `${etaMinutes} min`}
        </span>
      )}
    </button>
  );
}
