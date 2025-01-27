# react-roving-focus

Flexible roving focus (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) for React with support for any fixed or responsive layout.

[![NPM](https://img.shields.io/npm/v/react-roving-focus.svg)](https://www.npmjs.com/package/react-roving-focus) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-roving-focus)](https://bundlephobia.com/result?p=react-roving-focus) ![License](https://img.shields.io/github/license/jasongerbes/react-roving-focus)

## Examples

Refer to the [Storybook](https://jasongerbes.github.io/react-roving-focus) for various layout examples:

- [Horizontal List](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-horizontal-layout--basic)
- [Vertical List](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-vertical-layout--basic)
- [Fixed Column Grid](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--fixed-columns)
- [Responsive Column Grid](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--responsive-columns)
- [Masonry Layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-masonry-layout--basic) (aka Modular Grid)

## How it works

Unlike traditional roving tabindex implementations, `react-roving-focus` determines navigation order using the **rendered size and position** of elements, rather than row or column indices. This enables keyboard navigation across any 1D or 2D layout (fixed or responsive) without configuration.

## Installation

```bash
npm install react-roving-focus
# or
pnpm add react-roving-focus
# or
bun add react-roving-focus
```

## Usage

Wrap a group of focusable elements in a `<RovingFocusGroup>` and use the `useRovingFocus()` hook to control the `tabIndex` of each element.

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

### With an existing ref

If your focusable element has an existing `ref`, provide it to the `useRovingFocus()` hook.

```tsx
import { useRef } from 'react';
import { useRovingFocus } from 'react-roving-focus';

function ExampleItem({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tabIndex } = useRovingFocus({ ref: buttonRef });

  return (
    <button ref={buttonRef} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```

### With disabled elements

To disable a focusable element, set the `disabled` or `aria-disabled` attribute on the focusable element.

```tsx
import { useRovingFocus } from 'react-roving-focus';

function ExampleItem({ children }: { children: React.ReactNode }) {
  const { ref, tabIndex } = useRovingFocus<HTMLButtonElement>();

  return (
    <button ref={ref} tabIndex={tabIndex} disabled>
      {children}
    </button>
  );
}
```

Alternatively, set `disabled: true` in the `useRovingFocus()` hook.

```tsx
import { useRovingFocus } from 'react-roving-focus';

function ExampleItem({ children }: { children: React.ReactNode }) {
  const { ref, tabIndex } = useRovingFocus<HTMLButtonElement>({
    disabled: true,
  });

  return (
    <button ref={ref} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```

## Keyboard Support

Use the following keys to move focus between elements:

| Key                           | Function                                                   |
| :---------------------------- | :--------------------------------------------------------- |
| `Tab`                         | Move to next `<RovingFocusGroup>` or focusable element     |
| `Shift + Tab`                 | Move to previous `<RovingFocusGroup>` or focusable element |
| `←` (left arrow)              | Move focus to element on the left                          |
| `→` (right arrow)             | Move focus to element on the right                         |
| `↑` (up arrow)                | Move focus to element above                                |
| `↓` (down arrow)              | Move focus to element below                                |
| `Home` (or `fn` + `←` on Mac) | Move focus to first element in the `<RovingFocusGroup>`    |
| `End` (or `fn` + `→` on Mac)  | Move focus to last element in the `<RovingFocusGroup>`     |
