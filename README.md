# react-roving-focus

Flexible roving focus for React (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) with support for lists, responsive grids, and arbitrary layouts.

## Installation

```bash
npm install react-roving-focus
# or
pnpm add react-roving-focus
# or
bun add react-roving-focus
```

## Usage

Wrap a group of elements in a `<RovingFocusGroup>` and use the `useRovingFocus()` hook to control the `tabIndex` of each element.

```tsx
import { RovingFocusGroup, useRovingFocus } from 'react-roving-focus';

function ExampleGroup() {
  return (
    <RovingFocusGroup>
      <div>
        <ExampleItem>One</ExampleItem>
        <ExampleItem>Two</ExampleItem>
        <ExampleItem>Three</ExampleItem>
      </div>
    </RovingFocusGroup>
  );
}

function ExampleItem({ children }: { children: React.ReactNode }) {
  const { ref, tabIndex } = useRovingFocus<HTMLButtonElement>();

  return (
    <button ref={ref} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```

### With existing ref

If your focusable component has an existing `ref`, simply pass it into the `useRovingFocus()` hook.

```tsx
import { useRef } from 'react';
import { useRovingFocus } from 'react-roving-focus';

function ExampleItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { tabIndex } = useRovingFocus({ ref });

  return (
    <button ref={ref} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```
