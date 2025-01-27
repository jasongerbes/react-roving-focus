import { useRovingFocus } from '../src';
import { cn } from './utils';

export interface FocusableItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FocusableItem({
  className,
  children,
  disabled,
  ...props
}: FocusableItemProps) {
  const { ref, tabIndex } = useRovingFocus<HTMLButtonElement>();
  return (
    <button
      className={cn(
        'cursor-pointer rounded-lg border border-gray-300 bg-white py-3 text-center text-nowrap outline-amber-400 transition-colors focus:outline-2 hover:enabled:bg-amber-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        className,
      )}
      ref={ref}
      tabIndex={tabIndex}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
