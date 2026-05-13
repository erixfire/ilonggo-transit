import { ROUTE_TYPE_CONFIG } from '@/lib/constants';
import type { RouteType } from '@/types/transit';

interface Props {
  type: RouteType;
  code?: string;
  size?: 'sm' | 'md';
}

export function RouteModeBadge({ type, code, size = 'md' }: Props) {
  const cfg = ROUTE_TYPE_CONFIG[type];
  const px = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${cfg.bgClass} ${px}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${cfg.dotClass} flex-shrink-0`} />
      {code ? `${code}` : ''} {cfg.shortLabel}
    </span>
  );
}
