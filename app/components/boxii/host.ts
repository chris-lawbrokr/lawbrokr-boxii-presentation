/**
 * host.ts — the contract between the Overlay host component and the stateless
 * render components (Card, Hero, popups, bars, floating).
 *
 * The Overlay owns all reactive state + actions; each component reads/writes
 * through this interface. Popups expose an `…Closing` flag so they can play a
 * fade-OUT before the host unmounts them.
 */

import type { TabId } from "./content";

export interface Host {
  /** Active top-center tab. Setting it also clears any open chip popup. */
  tab: TabId;
  setTab(id: TabId): void;

  /** Hero-question popup. */
  openChip: string | null;
  chipClosing: boolean;
  openChipPopup(id: string): void;
  closeChip(): void;

  /** Full site-map modal. */
  navOpen: boolean;
  navClosing: boolean;
  openNav(): void;
  closeNav(): void;

  /** Mobile hamburger / CTA dropdown. */
  ctaOpen: boolean;
  ctaClosing: boolean;
  toggleCta(): void;
  closeCta(): void;

  /** Fade the overlay out (one gesture = one step). */
  dismiss(): void;
  /** Bring the overlay back after a dismiss. */
  reopen(): void;
  /** Permanently hide the floating mini (close the whole widget). */
  close(): void;
}
