# @bemedev/tansolid

> TanStack Router and Solid JS utilities and components, distributed in a
> modular format with a shadcn-like CLI.

`@bemedev/tansolid` is a collection of high-quality, reusable utilities,
signals, directives, and UI components designed specifically for
**SolidJS** and **TanStack Router**.

Unlike traditional component libraries, `@bemedev/tansolid` includes a CLI
tool that lets you copy the source code of specific components and helpers
directly into your repository. This gives you full control over the source
code, styling, and dependencies.

---

## Features

- 🛠️ **Modular CLI**: Initialize your configuration and selectively add
  components/signals directly to your project.
- 🚦 **TanStack Router Integration**: Seamless router-aware utilities and
  components.
- ⚡ **SolidJS Reactivity**: A rich set of custom reactive primitives
  (signals, directives, hooks).
- 🎨 **Unstyled & Customisable**: Zero locked-in styling. Bring your own
  Tailwind or vanilla CSS.

---

## CLI Usage

The package includes a binary called `tansolid` to manage copying modules
into your local codebase.

### 1. Initialization

Set up the configuration and directory structure in your project:

```bash
pnpm tansolid init
```

This command will:

- Create a configuration file named `.tansolid.bemedev.json`.
- Create a folder named `src/tansolid/` in your project.
- Copy default dependencies (`constants`, `types/index`) to
  `src/tansolid/`.
- Configure path alias `#tansolid/*` mapped to `./src/tansolid/*` in your
  `tsconfig.json`.

You can customize the folder name or JSON path with flags:

```bash
pnpm tansolid init --root custom-folder --json custom-config.json
```

### 2. Installing Dependencies

To install codebase configuration dependencies:

```bash
pnpm dlx tansolid install
```

### 3. Adding Components or Utilities

To add a modular component or utility to your project:

```bash
pnpm tansolid add ui/molecules/Tooltip
```

This will copy the `Tooltip` component along with all of its internal
dependency files (e.g., hooks, helpers, types) into your `src/tansolid/`
directory.

### 4. Removing Components

To clean up and remove a component or utility:

```bash
pnpm tansolid remove ui/molecules/Tooltip
```

### 5. Uninstalling Dependencies

To uninstall codebase configuration dependencies:

```bash
pnpm dlx tansolid uninstall
```

### 6. Destroying the Configuration

To remove all copied files and the configuration from your workspace:

```bash
pnpm dlx tansolid destroy
```

---

## Available Modules

### Signals & Reactivity (`src/tansolid/ui/signals/*`)

- **`createDebounce`**: Debounce state changes with simple configuration.
- **`createCounter`**: Reactive counter with boundaries, increment,
  decrement, and reset actions.
- **`createSleep`**: A reactive timeout/delay signal.
- **`createTyping`**: Typewriter effect signal.
- **`circular`**: Circular navigation/selection signal.
- **`focus`**: Window and element focus tracker.
- **`intersect`**: Intersection observer signal.
- **`interval`**: Safe reactive interval timer.
- **`lang`**: Language/translation reactivity.
- **`links`**: Active link tracker.
- **`ressource`**: Enhanced resource loader.
- **`scroll`**: Scroll direction and position observer.
- **`window`**: Screen size and dimensions reactivity.

### UI Molecules (`src/tansolid/ui/molecules/*`)

- **`Tooltip`**: A responsive, accessible tooltip component powered by
  `@kobalte/core`.
- **`AccordionQA`**: Frequently asked questions style accordion component.
- **`Counter`**: Clean interactive counter component.
- **`FadingDots`**: Modern loading animation/dots indicator.
- **`focus`**: Component to track focus state of children.
- **`LangSwitcher`**: Multilingual language switcher component.
- **`MultiText`**: Multi-line animated text transitions.
- **`Select`**: Accessible dropdown select component powered by
  `@kobalte/core`.
- **`TypingText`**: Smooth typewriter text component.
- **`reducer`**: React-style useReducer implementation for state
  management.

### Directives (`src/tansolid/ui/directives/*`)

- **`use:clickOutside`**: Detect and trigger actions when clicking outside
  an element.

### Helpers & Utilities (`src/tansolid/ui/helpers/*`)

- Base64 encoding/decoding
- SEO meta tags configuration and management
- Tailwind classes merge utilities (`cn`)
- Boolean tree recursive checkers
- Spacing formatters

---

## License

MIT
