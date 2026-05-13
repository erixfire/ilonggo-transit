import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function BottomSheet({ children, className = '' }: Props) {
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-30
        rounded-t-[2rem] bg-white dark:bg-slate-900
        shadow-sheet px-4 pt-3 pb-safe-bottom
        max-w-[430px] mx-auto
        ${className}
      `}
    >
      <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
      {children}
    </div>
  );
}
