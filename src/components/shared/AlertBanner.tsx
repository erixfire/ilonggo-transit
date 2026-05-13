import type { Alert } from '@/types/transit';

interface Props {
  alert: Alert;
  compact?: boolean;
}

const SEVERITY_STYLES = {
  info: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30',
  warning: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30',
  critical: 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30',
};

const TITLE_STYLES = {
  info: 'text-blue-800 dark:text-blue-300',
  warning: 'text-amber-800 dark:text-amber-300',
  critical: 'text-red-700 dark:text-red-300',
};

const BODY_STYLES = {
  info: 'text-blue-700 dark:text-blue-200',
  warning: 'text-amber-700 dark:text-amber-200',
  critical: 'text-red-700 dark:text-red-200',
};

export function AlertBanner({ alert, compact }: Props) {
  return (
    <div className={`rounded-3xl border p-4 ${SEVERITY_STYLES[alert.severity]}`}>
      <div className={`text-sm font-bold ${TITLE_STYLES[alert.severity]}`}>
        {alert.title}
      </div>
      {!compact && (
        <div className={`mt-1 text-xs leading-relaxed ${BODY_STYLES[alert.severity]}`}>
          {alert.body}
        </div>
      )}
      <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
        {alert.source}
      </div>
    </div>
  );
}
