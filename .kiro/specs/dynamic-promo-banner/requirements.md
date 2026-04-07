# Requirements Document

## Introduction

The dynamic promotional banner feature ensures the top-of-page banner on the storefront is strictly controlled by the admin panel. The admin can enable or disable the banner and configure its messages. The frontend component must respect these settings exclusively — no hardcoded fallback messages or default visibility states are permitted.

## Glossary

- **PromoBanner**: The React component (`PromoBanner.jsx`) that renders the promotional banner at the top of the storefront.
- **Admin_Panel**: The admin settings page (`AdminSettingsPage.jsx`) where administrators configure banner visibility and messages.
- **Settings_API**: The backend REST API that persists and retrieves site settings, including banner configuration.
- **Settings_Store**: The Redux slice (`settingsSlice.js`) that holds fetched settings in client-side state.
- **isVisible**: The boolean field `settings.banner.isVisible` that controls whether the banner is shown.
- **DEFAULT_MESSAGES**: A hardcoded array of fallback messages previously defined in `PromoBanner.jsx` — this must be removed.

---

## Requirements

### Requirement 1: Banner Visibility is Strictly Admin-Controlled

**User Story:** As a store administrator, I want the promotional banner to appear only when I explicitly enable it, so that I have full control over what customers see at the top of the storefront.

#### Acceptance Criteria

1. WHEN `settings.banner.isVisible` is `false`, THE PromoBanner SHALL return null and render no DOM output.
2. WHEN `settings.banner.isVisible` is any value other than the boolean `true` (including `undefined`, `null`, or missing), THE PromoBanner SHALL return null and render no DOM output.
3. WHILE the Settings_Store has not yet received a response from the Settings_API (i.e., `settings === null`), THE PromoBanner SHALL return null and render no DOM output.
4. WHEN `settings.banner.isVisible` is `true`, THE PromoBanner SHALL render the banner element in the DOM.

---

### Requirement 2: Banner Content Comes Exclusively from the Database

**User Story:** As a store administrator, I want the banner to display only the messages I configured in the admin panel, so that no hardcoded or default messages ever appear without my knowledge.

#### Acceptance Criteria

1. WHEN `settings.banner.isVisible` is `true` and `settings.banner.messages` is a non-empty array, THE PromoBanner SHALL display only the messages contained in that array.
2. THE PromoBanner SHALL NOT contain a `DEFAULT_MESSAGES` constant or any hardcoded fallback message array.
3. WHEN `settings.banner.messages` is an empty array or undefined, THE PromoBanner SHALL display no messages (rendering an empty or non-visible state).

---

### Requirement 3: Admin Panel Controls Banner Settings

**User Story:** As a store administrator, I want to toggle the banner on/off and edit its messages from the admin settings page, so that I can update the storefront without touching code.

#### Acceptance Criteria

1. WHEN an administrator toggles the visibility checkbox and saves, THE Admin_Panel SHALL send a settings payload to the Settings_API with the updated `banner.isVisible` boolean value.
2. WHEN an administrator edits the messages textarea and saves, THE Admin_Panel SHALL send a settings payload to the Settings_API with `banner.messages` as an array of non-empty trimmed strings (one per line).
3. IF the Settings_API returns an error, THEN THE Admin_Panel SHALL display an error notification to the administrator.
4. WHEN the Settings_API returns a success response, THE Admin_Panel SHALL display a success notification and update the Settings_Store with the new settings.

---

### Requirement 4: Banner Behavior When Visible

**User Story:** As a customer, I want the promotional banner to rotate through messages smoothly and allow me to dismiss it, so that I can read promotions without being permanently distracted.

#### Acceptance Criteria

1. WHILE the PromoBanner is visible and `settings.banner.messages` contains more than one message, THE PromoBanner SHALL rotate through messages on a 3-second interval with a fade transition.
2. WHILE the PromoBanner is visible and `settings.banner.messages` contains exactly one message, THE PromoBanner SHALL display that message statically without rotation.
3. WHEN a user clicks the close button, THE PromoBanner SHALL hide itself for the remainder of the current browser session.
4. WHILE the PromoBanner is not enabled (i.e., `isVisible !== true`), THE PromoBanner SHALL NOT start the message rotation interval.
