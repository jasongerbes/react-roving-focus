import { cn } from './utils';

export interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <>
      <button
        className="rounded-sm text-center text-sm text-balance text-gray-500 outline-amber-400 focus:outline-2"
        tabIndex={0}
      >
        Click here, press <code>TAB</code>, then use <code>ARROW KEYS</code>
      </button>
      <div
        className={cn(
          'mt-2.5 gap-2.5 rounded-2xl border border-gray-300 bg-gray-50 p-3',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
