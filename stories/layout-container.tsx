import { cn } from './utils';

export interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div
      className={cn(
        'gap-3 rounded-3xl border border-gray-300 bg-gray-50 p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
