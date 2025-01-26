# react-roving-focus

Flexible roving focus for React (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) with support for lists, responsive grids, and arbitrary layouts.

[![NPM](https://img.shields.io/npm/v/react-roving-focus.svg)](https://www.npmjs.com/package/react-roving-focus) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-roving-focus)](https://bundlephobia.com/result?p=react-roving-focus) ![License](https://img.shields.io/github/license/jasongerbes/react-roving-focus)

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
