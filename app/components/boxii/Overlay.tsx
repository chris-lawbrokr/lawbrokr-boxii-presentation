"use client";

/**
 * Overlay.tsx — the boxii intro overlay, ported from the boxii-mvp widget
 * (src/boxii.ts + components). It appears on page load covering the host site;
 * ONE scroll/swipe gesture fades it out (700ms) to reveal the page behind it,
 * after which a floating action pill lets the visitor reopen it.
 *
 * This is the HOST: it owns reactive state, gestures, and the loading
 * lifecycle, and composes the stateless pieces (Card / Marquee / Floating).
 */

import { useEffect, useRef, useState } from "react";
import {
  brand,
  type TabId,
  NEW_GESTURE,
  MOMENTUM_FLOOR,
  QUIET_MS,
} from "./content";
import type { Host } from "./host";
import { Icon } from "./icons";
import Card from "./Card";
import "./boxii.css";

type PopupId = "chip" | "nav" | "cta";
const POPUP_FADE_MS = 200;

// ---- Marquee ----
function Marquee() {
  const logos = [...brand.logos, ...brand.logos];
  return (
    <div className="marquee">
      <div className="fade l" />
      <div className="fade r" />
      <div className="marquee-track">
        {logos.map((l, i) => (
          <img key={i} src={l.src} alt={l.alt} aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}

// ---- Boot splash ----
function Boot({ loading }: { loading: boolean }) {
  return (
    <div className={`boot ${loading ? "" : "done"}`} aria-hidden="true">
      <div className="boot-spinner" />
    </div>
  );
}

// ---- Floating reopen pill ----
function FloatActions({ host, fluid }: { host: Host; fluid: boolean }) {
  return (
    <>
      <a
        className={`ia ia-primary ${fluid ? "fluid" : ""}`}
        href={brand.ctaPrimary.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="calendar" size="s6" />
        <span className="ia-label">Book a demo</span>
      </a>
      <button
        type="button"
        className={`ia ${fluid ? "fluid" : ""}`}
        onClick={host.reopen}
      >
        <Icon name="search" size="s6" />
        <span className="ia-label">Learn More</span>
      </button>
    </>
  );
}

function Floating({ host }: { host: Host }) {
  return (
    <>
      <div className="float mobile">
        <FloatActions host={host} fluid />
      </div>
      <div className="float desktop">
        <FloatActions host={host} fluid={false} />
      </div>
    </>
  );
}

export default function Overlay() {
  const [tab, setTab] = useState<TabId>("new");
  const [openChip, setOpenChip] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [chipClosing, setChipClosing] = useState(false);
  const [navClosing, setNavClosing] = useState(false);
  const [ctaClosing, setCtaClosing] = useState(false);

  const [dismissed, setDismissed] = useState(false);
  const [gone, setGone] = useState(false);
  const [closed, setClosed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Gesture state lives in refs so the window listeners always read the latest
  // values without rebinding. Mirror the relevant reactive state into refs each
  // render so the handlers (bound once) stay in sync.
  const dismissedRef = useRef(dismissed);
  dismissedRef.current = dismissed;
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const lockedRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);
  const touchYRef = useRef(0);
  const popupTimers = useRef<Record<PopupId, number | null>>({
    chip: null,
    nav: null,
    cta: null,
  });

  // ---- Dismiss / reopen ----
  const dismiss = () => {
    if (!dismissedRef.current) {
      dismissedRef.current = true;
      setDismissed(true);
    }
  };
  const reopen = () => {
    lockedRef.current = false;
    setDismissed(false);
    setGone(false);
  };
  const close = () => setClosed(true);

  // ---- Popups: open instantly, close after a fade, cancellable unmount. ----
  const cancelClose = (which: PopupId) => {
    const t = popupTimers.current[which];
    if (t) {
      clearTimeout(t);
      popupTimers.current[which] = null;
    }
    if (which === "chip") setChipClosing(false);
    if (which === "nav") setNavClosing(false);
    if (which === "cta") setCtaClosing(false);
  };

  const beginClose = (which: PopupId) => {
    if (which === "chip") setChipClosing(true);
    if (which === "nav") setNavClosing(true);
    if (which === "cta") setCtaClosing(true);
    if (popupTimers.current[which]) clearTimeout(popupTimers.current[which]!);
    popupTimers.current[which] = window.setTimeout(() => {
      popupTimers.current[which] = null;
      if (which === "chip") {
        setOpenChip(null);
        setChipClosing(false);
      } else if (which === "nav") {
        setNavOpen(false);
        setNavClosing(false);
      } else {
        setCtaOpen(false);
        setCtaClosing(false);
      }
    }, POPUP_FADE_MS);
  };

  const host: Host = {
    tab,
    setTab: (id) => {
      setTab(id);
      cancelClose("chip");
      setOpenChip(null);
    },
    openChip,
    chipClosing,
    openChipPopup: (id) => {
      cancelClose("chip");
      setOpenChip(id);
    },
    closeChip: () => {
      if (openChip && !chipClosing) beginClose("chip");
    },
    navOpen,
    navClosing,
    openNav: () => {
      cancelClose("nav");
      setNavOpen(true);
    },
    closeNav: () => {
      if (navOpen && !navClosing) beginClose("nav");
    },
    ctaOpen,
    ctaClosing,
    toggleCta: () => {
      if (ctaOpen && !ctaClosing) {
        beginClose("cta");
      } else {
        cancelClose("cta");
        setCtaOpen(true);
      }
    },
    closeCta: () => {
      if (ctaOpen && !ctaClosing) beginClose("cta");
    },
    dismiss,
    reopen,
    close,
  };

  // ---- Gestures (one gesture = one step) ----
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (dismissedRef.current) return; // let scroll reach the page behind us
      e.preventDefault();
      if (loadingRef.current) return; // ignore gestures while the splash is up
      if (Math.abs(e.deltaY) >= MOMENTUM_FLOOR) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = window.setTimeout(() => {
          lockedRef.current = false;
        }, QUIET_MS);
      }
      if (lockedRef.current) return;
      if (Math.abs(e.deltaY) < NEW_GESTURE) return;
      lockedRef.current = true;
      if (e.deltaY > 0) dismiss();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dismissedRef.current) return;
      e.preventDefault();
      if (loadingRef.current) return;
      if (lockedRef.current) return;
      const dy = touchYRef.current - e.touches[0].clientY;
      if (Math.abs(dy) < 40) return;
      lockedRef.current = true;
      if (dy > 0) dismiss();
    };
    const onTouchEnd = () => {
      lockedRef.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
    // Bound once; handlers read live state via refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Loading lifecycle: hold the splash until the logo + fonts are ready. ----
  useEffect(() => {
    let cancelled = false;
    const MIN_MS = 350;
    const MAX_MS = 3000;
    const started = Date.now();

    const preload = (src: string) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.onload = () => res();
        img.onerror = () => res();
        img.src = src;
        if (img.complete) res();
      });

    const assets: Promise<unknown>[] = [];
    if (brand.logoSrc) assets.push(preload(brand.logoSrc));
    const fontsReady =
      (document as { fonts?: { ready: Promise<unknown> } }).fonts?.ready ??
      Promise.resolve();
    const ready = Promise.all([...assets, fontsReady]);
    const failsafe = new Promise<void>((res) => setTimeout(res, MAX_MS));

    Promise.race([ready, failsafe]).then(async () => {
      const elapsed = Date.now() - started;
      if (elapsed < MIN_MS) {
        await new Promise((res) => setTimeout(res, MIN_MS - elapsed));
      }
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Clear any pending popup timers on unmount.
  useEffect(() => {
    const timers = popupTimers.current;
    return () => {
      for (const t of Object.values(timers)) if (t) clearTimeout(t);
    };
  }, []);

  return (
    <div className="boxii">
      <div
        className={`stage ${dismissed ? "dismissed" : ""} ${gone ? "hidden" : ""}`}
        onTransitionEnd={(e) => {
          if (dismissed && e.target === e.currentTarget) setGone(true);
        }}
      >
        <div className="frame">
          <div className="center">
            <div className="col">
              <div className="spacer" />
              <div className="card-wrap">
                <Card host={host} />
              </div>
              <div className="marquee-wrap">
                <Marquee />
              </div>
              <div className="spacer" />
            </div>
          </div>
        </div>
        <Boot loading={loading} />
      </div>

      {dismissed && !closed ? <Floating host={host} /> : null}
    </div>
  );
}
