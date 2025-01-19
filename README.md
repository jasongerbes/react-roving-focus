# **react-roving-focus**

Flexible roving focus for React (aka [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)) with support for lists, grids, and arbitrary layouts.

## Installation

```bash
npm install react-roving-focus
# or
pnpm add react-roving-focus
# or
bun add react-roving-focus
```

## Usage

```tsx
function Example() {
  return (
    <RovingFocusGroup>
      <div>
        <ExampleElement>One</ExampleElement>
        <ExampleElement>Two</ExampleElement>
        <ExampleElement>Three</ExampleElement>
      </div>
    </RovingFocusGroup>
  );
}

function ExampleElement({ children }: { children: React.ReactNode }) {
  const { ref, tabIndex } = useRovingFocus();

  return (
    <button ref={ref} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```
