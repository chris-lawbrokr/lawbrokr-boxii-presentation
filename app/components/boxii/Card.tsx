"use client";

/**
 * Card.tsx — the hero card (9:16 portrait / 16:9 desktop) that holds the
 * wordmark, top tabs, header CTAs, the swappable hero center, the bottom bars,
 * the mobile hamburger menu, and the popups (chip answer + site-map modal).
 *
 * Ported from the boxii-mvp widget's card.ts / hero.ts / bottom-bar.ts /
 * mobile-menu.ts / chip-popup.ts / nav-modal.ts.
 */

import { brand, allChips, type TabId } from "./content";
import type { Host } from "./host";
import { Icon } from "./icons";

/** Inline X used for the card's close button (sized per call). */
function CloseX({ size = 16, width = 2 }: { size?: number; width?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Tab({ host, id }: { host: Host; id: TabId }) {
  const active = host.tab === id;
  return (
    <button
      type="button"
      className={`tab ${active ? "tab-active" : ""}`}
      role="tab"
      aria-selected={active}
      onClick={() => host.setTab(id)}
    >
      {brand.tabs[id].label}
    </button>
  );
}

/** A header CTA; a link (new tab) when the brand supplies an href. */
function HeaderCta({
  cta,
  className,
}: {
  cta: { label: string; href?: string };
  className: string;
}) {
  if (cta.href) {
    return (
      <a
        className={className}
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta.label}
      </a>
    );
  }
  return (
    <button type="button" className={className}>
      {cta.label}
    </button>
  );
}

// -------------------------------------------------------------------------
// HERO CENTER (swappable per tab)
// -------------------------------------------------------------------------
function Hero({ host }: { host: Host }) {
  const t = brand.tabs[host.tab];

  if (t.nav) {
    return (
      <>
        {t.headline ? (
          <h2 className="headline" dangerouslySetInnerHTML={{ __html: t.headline }} />
        ) : null}
        {t.subhead ? <p className="subhead">{t.subhead}</p> : null}
        <div className="nav-menu">
          {t.nav.map((col) => (
            <div className="nav-col" key={col.heading}>
              <span className="nav-h">{col.heading}</span>
              {col.links.map((link) => (
                <button type="button" className="nav-link-item" key={link}>
                  {link}
                </button>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="headline" dangerouslySetInnerHTML={{ __html: t.headline ?? "" }} />
      {t.subhead ? (
        <p className="subhead">{t.subhead}</p>
      ) : (
        <div className="subhead-spacer" aria-hidden="true" />
      )}
      <div className="chips">
        {(t.chips ?? []).map((c) =>
          c.href ? (
            <a
              key={c.id}
              className="chip glass glass-btn"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.icon} {c.q}
            </a>
          ) : (
            <button
              key={c.id}
              type="button"
              className="chip glass glass-btn"
              onClick={() => host.openChipPopup(c.id)}
            >
              {c.icon} {c.q}
            </button>
          ),
        )}
      </div>
      <div className="cta-row">
        {t.ctaHref ? (
          <a
            className="cta-text"
            href={t.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta} <Icon name="arrow-right" size="s4" />
          </a>
        ) : (
          <button
            type="button"
            className="cta-text"
            onClick={() => {
              if (host.tab === "customer") host.openNav();
            }}
          >
            {t.cta} <Icon name="arrow-right" size="s4" />
          </button>
        )}
        <button
          type="button"
          className="cta-text dismiss-text"
          onClick={() => host.dismiss()}
        >
          No thanks, just browsing!
        </button>
      </div>
    </>
  );
}

// -------------------------------------------------------------------------
// BOTTOM BARS
// -------------------------------------------------------------------------
function DesktopBar() {
  const { testimonial, infoCards } = brand;
  return (
    <div className="bottom-bar">
      <div className="testimonial glass">
        <img src={testimonial.avatar} alt="" aria-hidden="true" />
        <div>
          <blockquote>{testimonial.quote}</blockquote>
          {testimonial.href ? (
            <a
              className="readmore"
              href={testimonial.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {testimonial.readMore} <Icon name="arrow-right" size="s4" />
            </a>
          ) : (
            <button type="button" className="readmore">
              {testimonial.readMore} <Icon name="arrow-right" size="s4" />
            </button>
          )}
        </div>
      </div>
      {infoCards.map((c) => (
        <a
          key={c.title}
          className="ca-card glass glass-btn"
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="label">{c.label}</span>
          <span className="title">{c.title}</span>
          <span className="sub">{c.sub}</span>
        </a>
      ))}
      <button type="button" className="ca-square glass glass-btn">
        <Icon name="login" size="s5" /> Login
      </button>
    </div>
  );
}

function MobileBar() {
  return (
    <div className="ca-mobile">
      <button type="button" className="cam-btn glass glass-btn">
        <Icon name="newspaper" size="s5" /> Blogs
      </button>
      <button type="button" className="cam-btn cam-primary">
        <Icon name="calendar" size="s5" /> Book now
      </button>
    </div>
  );
}

// -------------------------------------------------------------------------
// MOBILE HAMBURGER MENU
// -------------------------------------------------------------------------
function MobileMenu({ host }: { host: Host }) {
  const tabIds = Object.keys(brand.tabs) as TabId[];
  // Button + dropdown are direct children of the full-width, position:absolute
  // `.mobile-cta` bar so the dropdown (left:0/right:0) spans the bar — not the
  // button's 3rem width.
  return (
    <>
      <button
        type="button"
        className="cta-menu-btn glass glass-btn"
        aria-label="Menu"
        aria-expanded={host.ctaOpen}
        onClick={() => host.toggleCta()}
      >
        <Icon name={host.ctaOpen && !host.ctaClosing ? "x" : "menu"} size="s5" />
      </button>
      {host.ctaOpen ? (
        <>
          <button
            type="button"
            className="cta-backdrop"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => host.closeCta()}
          />
          <div className={`cta-pop ${host.ctaClosing ? "is-closing" : ""}`}>
            {tabIds.map((id) => (
              <button
                key={id}
                type="button"
                className={`cta-item ${host.tab === id ? "cta-item-active" : ""}`}
                onClick={() => {
                  host.setTab(id);
                  host.closeCta();
                }}
              >
                {brand.tabs[id].label}
              </button>
            ))}
            <div className="cta-divider" />
            <a
              className="cta-item"
              href={brand.ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => host.closeCta()}
            >
              {brand.ctaSecondary.label}
            </a>
            <a
              className="cta-item cta-item-primary"
              href={brand.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => host.closeCta()}
            >
              {brand.ctaPrimary.label}
            </a>
          </div>
        </>
      ) : null}
    </>
  );
}

// -------------------------------------------------------------------------
// POPUPS
// -------------------------------------------------------------------------
function ChipPopup({ host }: { host: Host }) {
  const chip = allChips().find((c) => c.id === host.openChip);
  if (!chip) return null;
  const closing = host.chipClosing ? "is-closing" : "";
  return (
    <div
      className={`chip-backdrop ${closing}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) host.closeChip();
      }}
    >
      <div className={`chip-pop ${closing}`} role="dialog" aria-modal="true">
        <button
          type="button"
          className="chip-close"
          aria-label="Close"
          onClick={() => host.closeChip()}
        >
          <Icon name="x" size="s4" />
        </button>
        <div className="chip-pop-body">
          <h3>{chip.title}</h3>
          <p>{chip.body}</p>
          <div className="chip-pop-actions">
            <button type="button" className="pop-btn primary">
              {chip.primary}
            </button>
            <button type="button" className="pop-btn secondary">
              Talk to sales
            </button>
          </div>
          <p className="chip-pop-foot">{brand.chipFoot}</p>
        </div>
      </div>
    </div>
  );
}

function NavModal({ host }: { host: Host }) {
  if (!host.navOpen) return null;
  const closing = host.navClosing ? "is-closing" : "";
  return (
    <div
      className={`chip-backdrop ${closing}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) host.closeNav();
      }}
    >
      <div
        className={`chip-pop nav-pop ${closing}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="chip-close"
          aria-label="Close"
          onClick={() => host.closeNav()}
        >
          <Icon name="x" size="s4" />
        </button>
        <div className="chip-pop-body">
          <div className="nav-menu">
            {brand.siteNav.map((col) => (
              <div className="nav-col" key={col.heading}>
                <span className="nav-h">{col.heading}</span>
                {col.links.map((link) => (
                  <button type="button" className="nav-link-item" key={link}>
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// CARD
// -------------------------------------------------------------------------
export default function Card({ host }: { host: Host }) {
  return (
    <div className="card">
      <div className="card-bg" aria-hidden="true" />

      <div className="wordmark-wrap">
        {brand.logoSrc ? (
          <img className="wordmark" src={brand.logoSrc} alt={brand.name} />
        ) : (
          <span className="wordmark wordmark-text">{brand.name}</span>
        )}
      </div>

      <div className="top-tabs glass" role="tablist">
        <Tab host={host} id="new" />
        <Tab host={host} id="comparing" />
        <Tab host={host} id="customer" />
      </div>

      <div className="top-right">
        <HeaderCta cta={brand.ctaPrimary} className="nav-btn nav-primary" />
        <button
          type="button"
          className="nav-btn close-btn glass glass-btn"
          aria-label="Close"
          onClick={host.dismiss}
        >
          <CloseX size={16} width={2} />
        </button>
      </div>

      <div className="mobile-cta">
        <MobileMenu host={host} />
      </div>

      {/* Re-keyed by tab so switching replays the hero crossfade. */}
      <div className="hero" key={host.tab}>
        <Hero host={host} />
      </div>

      <DesktopBar />
      <MobileBar />
      <ChipPopup host={host} />
      <NavModal host={host} />
    </div>
  );
}
