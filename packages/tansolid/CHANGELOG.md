# CHANGELOG

## CHANGELOG

<details>
<summary>

## **[0.5.0] - 26/06/2026** => _00:30_

</summary>

- Remove check icon (`Check`) and select item indicator
  (`Select.ItemIndicator`) from `LangSwitcher` component
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.4.0] - 26/06/2026** => _00:24_

</summary>

- Remove dropdown indicator icon (`ChevronDown`) and clean up imports in
  `LangSwitcher` component
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.3.0] - 25/06/2026** => _23:55_

</summary>

- Remove modular subpath exports from `package.json`, exposing only the
  main entry point `.`
- Restructure programmatic API to export CLI helper/command functions
  (`add`, `destroy`, `init`, `install`, `remove`, `uninstall`) instead of
  UI components, constants, and types
- Add CLI test for adding `LangSwitcher` component
- Refactor Kobalte imports in `Select` molecule component
- Update dependency `@bemedev/codebase` to `^1.3.0`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.0] - 25/06/2026** => _21:10_

</summary>

- Add `LangSwitcher` and `Select` UI molecules
- Add `install` and `uninstall` CLI commands to manage configuration
  dependencies
- Add support for customizable root folder and configuration JSON path in
  CLI `init` command
- Refactor configuration directory rename to `tansolid`
- Refactor CLI `add` and `remove` commands to resolve component
  dependencies
- Refactor type definitions and remove obsolete `LocalImage` component
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.1.0] - 17/06/2026** => _02:30_

</summary>

- Add CLI command suite including `init`, `add`, `remove`, and `destroy`
  commands
- Add custom SolidJS signals: `circular`, `counter`, `createTyping`,
  `debounce`, `focus`, `intersect`, `interval`, `lang`, `links`,
  `ressource`, `scroll`, `sleep`, `window`
- Add UI molecules: `AccordionQA`, `Counter`, `FadingDots`, `focus`,
  `MultiText`, `reducer`, `Tooltip`, `TypingText`
- Add UI atom exports and styling helpers (e.g. named exports, Tailwind
  classes merge utility)
- Add utility helpers: `array`, `string`, `seo`, `types`, `valibot`
- <u>Test coverage **_100%_**</u>

</details>

<br/>
