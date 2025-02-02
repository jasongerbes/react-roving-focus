import { TextDirection } from '../src';
import { cn } from './utils';

export interface LayoutContainerProps {
  className?: string;
  children: React.ReactNode;
  dir?: TextDirection;
}

export function LayoutContainer({
  className,
  children,
  dir,
}: LayoutContainerProps) {
  return (
    <div className="flex flex-col items-start gap-2.5" dir={dir}>
      <button
        className="rounded-sm px-1 text-center text-sm text-balance text-gray-500 outline-amber-400 focus:outline-2"
        tabIndex={0}
      >
        Click here, press <code>TAB</code>, then use <code>ARROW KEYS</code>
      </button>
      <div
        className={cn(
          'w-full gap-2.5 rounded-2xl border border-gray-300 bg-gray-50 p-3',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
