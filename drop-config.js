// =============================================================
//  VISÃO — DROP DATE (single source of truth)
//  - Set to null   -> both countdowns show "drop coming soon" (no clock).
//  - Set to a date -> both countdowns tick down to it.
//  Format: 'YYYY-MM-DDTHH:MM:SS-04:00'   (-04:00 = US Eastern / EDT)
// =============================================================
// No firm date yet. Sample lands ~July 8-10, then ~2 weeks of marketing.
// When ready, replace null with a date, e.g.:
//   window.VISAO_DROP_DATE = '2026-08-01T19:00:00-04:00';
window.VISAO_DROP_DATE = null;
