# react-roving-focus

Flexible roving focus for React (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) with support for lists, responsive grids, and arbitrary layouts.

[![NPM](https://img.shields.io/npm/v/react-roving-focus.svg)](https://www.npmjs.com/package/react-roving-focus) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-roving-focus)](https://bundlephobia.com/result?p=react-roving-focus) ![License](https://img.shields.io/github/license/jasongerbes/react-roving-focus)

## Examples

Refer to the `react-roving-focus` [Storybook](https://jasongerbes.github.io/react-roving-focus) for various layout examples:

- [Horizontal Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-horizontal-layout--basic)
- [Vertical Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-vertical-layout--basic)
- [Grid Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--fixed-columns) (fixed column count)
- [Responsive Grid Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--responsive-columns) (variable column count)
- [Brick Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-brick-layout--basic) (aka Masonry Layout)

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
