import { useRovingFocus } from '../src';
import { cn } from './utils';

export interface FocusableItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FocusableItem({
  className,
  children,
  ...props
}: FocusableItemProps) {
  const { ref, tabIndex } = useRovingFocus<HTMLButtonElement>();
  return (
    <button
      className={cn(
        'cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-nowrap outline-amber-400 transition-colors hover:bg-amber-50 focus:outline-2',
        className,
      )}
      ref={ref}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  );
}
