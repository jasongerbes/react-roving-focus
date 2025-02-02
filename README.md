# react-roving-focus

Flexible roving focus (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) for React with support for any fixed or responsive layout.

[![NPM](https://img.shields.io/npm/v/react-roving-focus.svg)](https://www.npmjs.com/package/react-roving-focus) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-roving-focus)](https://bundlephobia.com/result?p=react-roving-focus) ![License](https://img.shields.io/github/license/jasongerbes/react-roving-focus)

## Examples

Refer to the [Storybook](https://jasongerbes.github.io/react-roving-focus) for various examples:

- [Horizontal layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-horizontal-layout--basic)
- [Vertical layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-vertical-layout--basic)
- [Grid layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--fixed-columns)
- [Responsive grid layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--responsive-columns)
- [Nested grid layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-nested-grid-layout--basic)
- [Masonry layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-masonry-layout--basic) (aka modular grid)
- [Right-to-left layout](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--rtl)

## How it works

Unlike traditional roving tabindex implementations, `react-roving-focus` determines navigation order using the **rendered size and position** of elements, rather than row or column indices. This enables keyboard navigation across any 1D or 2D layout (fixed or responsive) without any configuration.

### Keyboard Support

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

### Performance

To minimize re-renders, each element maintains its own `tabIndex` state via the `useRovingFocus()` hook. The `<RovingFocusGroup>` updates individual `tabIndex` state values in response to element registration, unregistration, focus changes, and enabled/disabled state changes.

The `<RovingFocusGroup>` determines the 'first' and 'last' elements during registration and unregistration. To track accessibility state changes, a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) monitors the `disabled` and `aria-disabled` attributes of all registered elements.

When an arrow key is pressed, the 'next' element is calculated using multi-level filtering and simple distance calculations for efficiency. Element positions are intentionally not cached since layout changes (particularly those driven by state) may not be automatically detectable.

Performance has been stress tested using various layouts with [10,000 focusable elements](https://jasongerbes.github.io/react-roving-focus/?path=/story/examples-grid-layout--stress-test).

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

function Example() {
  return (
    <RovingFocusGroup>
      <div>
        <ExampleItem>1</ExampleItem>
        <ExampleItem>2</ExampleItem>
        <ExampleItem>3</ExampleItem>
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

If a focusable element has an existing `ref`, provide it to the `useRovingFocus()` hook.

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

### With right-to-left layouts

To support right-to-left layouts, set `dir="rtl"` on the root HTML element.

```tsx
import { RovingFocusGroup } from 'react-roving-focus';

function App() {
  return (
    <html dir="rtl">
      <body>
        <RovingFocusGroup>
          <div>
            <ExampleItem>1</ExampleItem>
            <ExampleItem>2</ExampleItem>
            <ExampleItem>3</ExampleItem>
          </div>
        </RovingFocusGroup>
      </body>
    </html>
  );
}
```

Alternatively, set `dir="rtl"` on the `<RovingFocusGroup>`:

```tsx
import { RovingFocusGroup } from 'react-roving-focus';

function Example() {
  return (
    <RovingFocusGroup dir="rtl">
      <div>
        <ExampleItem>1</ExampleItem>
        <ExampleItem>2</ExampleItem>
        <ExampleItem>3</ExampleItem>
      </div>
    </RovingFocusGroup>
  );
}
```
