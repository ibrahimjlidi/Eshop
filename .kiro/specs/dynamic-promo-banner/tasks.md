# Tasks

## Task List

- [x] 1. Remove DEFAULT_MESSAGES and fix visibility logic in PromoBanner.jsx
  - [x] 1.1 Delete the `DEFAULT_MESSAGES` constant from `PromoBanner.jsx`
  - [x] 1.2 Replace the `enabled` expression with `settings?.banner?.isVisible === true`
  - [x] 1.3 Replace the `messages` expression with `settings?.banner?.messages ?? []`
  - [x] 1.4 Verify the component returns `null` when `settings` is `null` or `isVisible` is not `true`

- [x] 2. Verify admin settings page sends correct payload
  - [x] 2.1 Confirm `AdminSettingsPage.jsx` sends `banner.isVisible` as a boolean (not a string)
  - [x] 2.2 Confirm `AdminSettingsPage.jsx` filters empty lines before sending `banner.messages`

- [ ] 3. Manual smoke test
  - [ ] 3.1 Disable banner in admin panel → confirm banner does not appear on storefront
  - [ ] 3.2 Enable banner with custom messages → confirm only those messages appear
  - [ ] 3.3 Enable banner with no messages → confirm banner is hidden or empty
  - [ ] 3.4 Reload page while settings are loading → confirm banner does not flash before settings arrive
