import { cn } from './utils';

export interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div
      className={cn(
        'gap-2.5 rounded-2xl border border-gray-300 bg-gray-50 p-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
