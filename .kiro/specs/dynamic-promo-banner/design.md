# Design Document: Dynamic Promo Banner

## Overview

The promotional banner displayed at the top of the storefront must be strictly controlled by the admin panel. The current implementation in `PromoBanner.jsx` contains fallback logic (`DEFAULT_MESSAGES` and `?? true` defaults) that causes the banner to appear even when the admin has disabled it. This design removes that fallback logic so the banner's visibility and content are exclusively determined by the admin-configured settings stored in the database.

## Architecture

The feature spans three layers:

- **Backend**: `Settings` model (MongoDB) stores `banner.isVisible` (Boolean) and `banner.messages` (String[]). The `settingsController` exposes GET and PUT endpoints. No backend changes are required.
- **State Management**: `settingsSlice.js` (Redux Toolkit) fetches settings on app load and stores them in `state.settings`. No changes required.
- **Frontend Component**: `PromoBanner.jsx` reads `state.settings.banner` and renders accordingly. This is the only file that requires changes.

## Component Design: PromoBanner.jsx

### Current (Broken) Behavior

```js
const messages = settings?.banner?.messages?.length
  ? settings.banner.messages
  : DEFAULT_MESSAGES; // ← fallback causes banner to show with hardcoded content

const enabled = settings ? (settings.banner?.isVisible ?? true) : true; // ← defaults to true before settings load
```

The `?? true` fallback means the banner is shown while settings are still loading (or if the API fails), and `DEFAULT_MESSAGES` means content is shown even when the admin has configured no messages.

### Target Behavior

```js
// Banner is ONLY shown when settings are loaded AND isVisible is explicitly true
const enabled = settings?.banner?.isVisible === true;

// Messages come exclusively from the database — no fallback
const messages = settings?.banner?.messages ?? [];
```

- `DEFAULT_MESSAGES` constant is removed entirely.
- While settings are loading (`settings === null`), `enabled` evaluates to `false`, so the banner is hidden.
- If `isVisible` is `false` or missing, the banner is hidden.
- If `messages` is empty, the banner renders nothing meaningful (and since `enabled` would typically be `false` in that case, it won't render at all).

### Visibility State Machine

```
settings === null  →  banner hidden  (loading state)
isVisible === false →  banner hidden  (admin disabled)
isVisible === true  →  banner visible with DB messages
```

### Message Rotation

The existing rotation logic (3-second interval with fade transition) is preserved unchanged. It only runs when `enabled === true` and `messages.length > 1`.

### Close Button

The user-dismissible close button (`setVisible(false)`) is preserved. Once dismissed, the banner stays hidden for the current session.

## Files Changed

| File | Change |
|------|--------|
| `frontend/src/components/PromoBanner.jsx` | Remove `DEFAULT_MESSAGES`, replace fallback logic with strict `=== true` check |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do.*

### Property 1: Non-true isVisible always hides banner

For any value of `settings.banner.isVisible` that is not the boolean `true` (including `false`, `undefined`, `null`, or a missing field), the PromoBanner component SHALL return null and produce no DOM output.

**Validates: Requirements 1.1, 1.2**

### Property 2: Loading state hides banner

For any application state where `settings` is `null` (i.e., settings have not yet loaded from the API), the PromoBanner component SHALL return null and produce no DOM output.

**Validates: Requirements 1.3**

### Property 3: Enabled banner shows only DB messages

For any application state where `settings.banner.isVisible` is `true` and `settings.banner.messages` is a non-empty array, the PromoBanner component SHALL display only messages from that array and no hardcoded fallback messages.

**Validates: Requirements 2.1, 2.2**

### Property 4: Rotation interval inactive when banner is disabled

For any application state where `settings.banner.isVisible !== true`, the PromoBanner component SHALL NOT start or maintain a message rotation interval.

**Validates: Requirements 4.4**
