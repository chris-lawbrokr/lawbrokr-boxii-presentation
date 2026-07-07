"use client";

export default function ClonedSite({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <iframe
      src={src}
      title={title}
      // ph-no-capture: keep PostHog/rrweb from serializing this iframe's huge
      // cloned-site DOM into every session recording. The recorder still runs
      // (and still captures the Boxii overlay) — the iframe is just stored as a
      // placeholder box, which removes the main-thread lag from snapshotting it.
      className="ph-no-capture"
      // allow-scripts is REQUIRED or Chrome blocks every script in the clone
      // ("Blocked script execution … the frame is sandboxed"), leaving all its
      // JS-driven clicks dead. It's a trusted, same-origin snapshot, so run it.
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals"
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
}
