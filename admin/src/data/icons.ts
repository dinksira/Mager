export const ICONS: Record<string, string> = {
  star: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 20 11 29 12 22 18 24 27 16 22 8 27 10 18 3 12 12 11"/></svg>`,
  target: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="5"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,
  shield: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4l4 8 8 1-6 6 2 9-8-5-8 5 2-9-6-6 8-1z"/></svg>`,
  bolt: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 3 16 13 6 13 16 21 13 29 24 19 14 19 26 11"/></svg>`,
  heart: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 27c-1 0-9-5.5-11-10.5S4 10 8 7c2.5-1.8 5.5-1.2 8 1.5 2.5-2.7 5.5-3.3 8-1.5 4 3 3.5 7.5 1.5 12S17 27 16 27z"/></svg>`,
  globe: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="12"/><ellipse cx="16" cy="16" rx="5" ry="12"/><path d="M4 16h24"/></svg>`,
  lightbulb: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c-4 0-7 3-7 7 0 3 1.5 5 3 7v3h8v-3c1.5-2 3-4 3-7 0-4-3-7-7-7z"/><path d="M12 24h8"/><path d="M13 28h6"/></svg>`,
  rocket: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4C10 4 6 12 6 16c0 4 3 7 3 7l14-5c0-5 1-14-7-14z"/><circle cx="16" cy="13" r="2.5"/><path d="M9 23l-2 5 5-2"/><path d="M23 21l2 5-5-2"/></svg>`,
  handshake: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20v-8l4-2 4 2 4-2 4 2 4-2 4 2v8l-4 2-4-2-4 2-4-2-4 2z"/><path d="M8 10V6l4-2 4 2 4-2 4 2v4"/><path d="M16 10v6"/></svg>`,
  layers: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 4 28 11 16 18 4 11"/><polygon points="16 18 28 25 16 32 4 25"/><path d="M4 11l12 7 12-7"/><path d="M4 25l12-7 12 7"/></svg>`,
  chart: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="20" width="5" height="8"/><rect x="13.5" y="14" width="5" height="14"/><rect x="23" y="7" width="5" height="21"/><path d="M4 4l1 3 4-2 3 3 4-2 3 3 4-2 3 3"/></svg>`,
  gear: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="3.5"/><path d="M16 1v4M16 27v4M6.5 6.5l2.8 2.8M22.7 22.7l2.8 2.8M1 16h4M27 16h4M6.5 25.5l2.8-2.8M22.7 9.3l2.8-2.8"/></svg>`,
  leaf: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M28 4S16 6 10 14c-4 5-6 13-6 13s8-2 13-6c8-6 11-17 11-17z"/><path d="M20 12l-8 8"/></svg>`,
  compass: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="12"/><polygon points="16 6 19 13 26 16 19 19 16 26 13 19 6 16 13 13" fill="currentColor" fill-opacity="0.25"/><polygon points="16 6 19 13 26 16 19 19 16 26 13 19 6 16 13 13"/></svg>`,
};

export const ICON_NAMES = Object.keys(ICONS);

export const ICON_OPTIONS = ICON_NAMES.map(k => ({ value: k, label: k.charAt(0).toUpperCase() + k.slice(1) }));
