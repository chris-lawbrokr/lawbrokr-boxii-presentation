"use client";

import { useEffect } from "react";

/**
 * BoxiiEmbed — loads the real production Boxii loader instead of the hard-coded
 * React port. This mirrors the customer integration snippet exactly:
 *
 *   <script src="https://cdn.lawbrokr.com/js/latest/boxii.min.js"
 *           data-site-id="lawbrokr"></script>
 *
 * The loader reads `data-site-id` off `document.currentScript` to resolve the
 * tenant, then mounts its own shadow-DOM overlay onto `document.body` — over the
 * cloned site iframe. We inject the script imperatively (rather than putting it
 * in the JSX / using next/script) so it behaves identically to a normal embed:
 * a plain classic script appended to <body>, with `document.currentScript` set
 * during its synchronous execution so the site-id is read correctly.
 *
 * PostHog + rrweb session recording run as normal (the lawbrokr tenant carries a
 * PostHog key). The recorder captures the overlay fine; the one thing it must
 * NOT serialize is the giant same-origin `/clone.html` iframe — that's marked
 * `ph-no-capture` in cloned-site.tsx so the recorder stores it as a placeholder
 * box instead of walking its multi-MB DOM (which is what made the page lag).
 */

const SRC = "https://cdn.lawbrokr.com/js/latest/boxii.min.js";
const SITE_ID = "lawbrokr";

export default function BoxiiEmbed() {
  useEffect(() => {
    // Guard against React Strict Mode's double-invoke in dev.
    if (document.querySelector(`script[data-boxii-loader]`)) return;

    const script = document.createElement("script");
    script.src = SRC;
    script.dataset.siteId = SITE_ID;
    script.dataset.boxiiLoader = "";
    document.body.appendChild(script);
  }, []);

  return null;
}
