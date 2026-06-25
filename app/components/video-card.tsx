"use client";

import {
  ChevronDown,
  FileLock,
  Globe,
  Landmark,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { rhymesDisplay } from "../lib/fonts";
import CardActions from "./card-actions";
import CallCtaMenu from "./call-cta-menu";

// Compliance example chips shown below the search input. Clicking one opens the
// chat dialogue seeded with that framework as the topic.
const CHIPS = [
  { icon: Landmark, label: "CMMC" },
  { icon: ShieldCheck, label: "SOC 2" },
  { icon: Globe, label: "GDPR" },
  { icon: FileLock, label: "HIPAA" },
];

// The hero card: green-grid background with Mycroft branding, top-row nav,
// supporting copy, and CTA buttons layered on top.
export default function VideoCard({
  onGoToSite,
}: {
  // Dismisses the intro overlay to reveal the embedded main site behind it.
  onGoToSite?: () => void;
}) {
  // Which compliance chip opened the chat, or null when the intro search view
  // is showing. Setting a topic grows the search input into a chat dialogue.
  const [chatTopic, setChatTopic] = useState<string | null>(null);
  // Text typed into the intro search input. The first keystroke opens the chat
  // and the text carries over into the dialogue's composer.
  const [draft, setDraft] = useState("");

  const closeChat = () => {
    setChatTopic(null);
    setDraft("");
  };

  return (
    <div className="relative mx-auto flex aspect-[1080/1920] w-full max-w-[min(100%,calc((100vh_-_10rem_-_8px)*9/16))] items-center justify-center overflow-hidden rounded-4xl text-[clamp(2rem,8vw,6rem)] font-bold text-[#111] min-[1150px]:aspect-[1920/1080] min-[1150px]:max-w-[min(100%,calc((100vh_-_10rem_-_8px)*16/9))]">
      {/* Mycroft green grid hero background. */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="/bg.png"
        alt=""
        aria-hidden
      />
      {/* Mycroft wordmark, pinned top-left in place of the search bar. */}
      <img
        src="/images/mycroft-logo.svg"
        alt="Mycroft"
        className="absolute left-6 top-6 w-32 min-[1150px]:left-8 min-[1150px]:top-8 min-[1150px]:w-40"
      />
      {/* Center top: jump to the embedded main site behind the overlay. */}
      <button
        type="button"
        onClick={onGoToSite}
        className="absolute left-1/2 top-6 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base font-normal text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:bg-white/20 min-[1150px]:top-8 min-[1150px]:flex"
      >
        Go to main site
      </button>
      {/* Desktop: full call + CTA pills. Mobile: a single circular dropdown. */}
      <div className="absolute right-6 top-6 hidden items-center gap-3 min-[1150px]:right-8 min-[1150px]:top-8 min-[1150px]:flex">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base font-normal text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:bg-white/20"
        >
          Book a Demo
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base font-normal text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:bg-white/20"
        >
          Login
        </button>
      </div>
      <div className="absolute right-6 top-6 min-[1150px]:hidden">
        <CallCtaMenu />
      </div>
      {/* Center search section, moved over from the chat card. Clicking a
          compliance chip swaps this for a chat dialogue (see ChatBox). */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 px-8 text-white">
        {chatTopic === null ? (
          <>
            <h2
              className={`text-center text-2xl font-medium leading-tight text-white min-[1150px]:text-4xl ${rhymesDisplay.className}`}
            >
              Security automated. Compliance solved.
            </h2>
            <div className="flex w-full items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white shadow-lg shadow-black/10 backdrop-blur-md">
              <SearchGlyph />
              <input
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  // Any text opens the chat; default the topic to CMMC.
                  if (e.target.value && chatTopic === null) setChatTopic("CMMC");
                }}
                placeholder="Ask us about anything..."
                className="w-full bg-transparent text-base font-normal text-white placeholder:text-white/70 focus:outline-none"
              />
            </div>

            <div className="hidden w-full flex-wrap items-center justify-center gap-3 min-[1150px]:flex">
              {CHIPS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setChatTopic(label)}
                  className="flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-normal text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <Icon className="size-4 text-white/80" />
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex cursor-pointer flex-col items-center gap-1 text-sm font-normal text-white/70 transition-colors hover:text-white"
            >
              I&apos;m looking for something else
              <ChevronDown className="size-4" />
            </button>
          </>
        ) : (
          <ChatBox
            topic={chatTopic}
            initialDraft={draft}
            onClose={closeChat}
          />
        )}
      </div>
      {/* Desktop-only customer testimonial pinned bottom-left, glass styled. */}
      <figure className="absolute bottom-8 left-8 hidden h-24 max-w-[520px] items-center gap-4 rounded-3xl border border-white/30 bg-white/10 px-6 text-left text-white shadow-lg shadow-black/10 backdrop-blur-md min-[1150px]:flex">
        <img
          src="/images/testimonial-icon.png"
          alt=""
          aria-hidden
          className="size-12 shrink-0 rounded-xl"
        />
        <div className="flex flex-col gap-1">
          <blockquote className="max-w-[300px] text-sm font-normal">
            Mycroft&apos;s 5-in-1 platform seamlessly consolidated our entire
            security stack.
          </blockquote>
          <button
            type="button"
            className="text-left text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            Read more
          </button>
        </div>
      </figure>
      <CardActions />
    </div>
  );
}

// The magnifier glyph used inside the search input and chat composer.
function SearchGlyph() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-white/80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// "Book a demo" CTA used between sections of the chat response.
function BookDemo() {
  return (
    <button
      type="button"
      className="mt-1 inline-flex w-fit items-center rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-white/30"
    >
      Book a demo
    </button>
  );
}

// The grown-up search input: a glass chat dialogue seeded with the chosen
// compliance topic, with an X to collapse back to the search view.
function ChatBox({
  topic,
  initialDraft,
  onClose,
}: {
  topic: string;
  initialDraft: string;
  onClose: () => void;
}) {
  // While closing, play the shrink animation; unmount once it finishes so the
  // fade-out mirrors the fade-in instead of vanishing instantly.
  const [closing, setClosing] = useState(false);
  // The composer carries over whatever was typed in the intro search input.
  const [message, setMessage] = useState(initialDraft);

  // The Overlay swallows wheel/touch gestures to drive the intro and dismiss
  // it. Those native listeners sit on an ancestor, so a React onWheel here
  // fires too late to stop them. Attach native listeners on the scroll area
  // that stopPropagation (without preventing default) so the conversation
  // scrolls on its own while the gesture never reaches the overlay.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", stop);
    el.addEventListener("touchstart", stop);
    el.addEventListener("touchmove", stop);
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  return (
    <div
      onAnimationEnd={(e) => {
        // Only react to this element's own shrink, not the grow or any child.
        if (closing && e.target === e.currentTarget) onClose();
      }}
      className={`mx-auto flex h-[clamp(15rem,34vh,20rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/10 text-left text-white shadow-lg shadow-black/10 backdrop-blur-md ${
        closing ? "animate-chat-shrink" : "animate-chat-grow"
      }`}
    >
      {/* Header: topic + close. */}
      <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Sparkles className="size-4 text-white/80" />
          {topic} compliance
        </div>
        <button
          type="button"
          onClick={() => setClosing(true)}
          aria-label="Close chat"
          className="flex size-7 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Conversation. Seeded with a fixed CMMC overview response (placeholder
          content) shown regardless of which compliance chip was clicked. */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-start gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15">
            <Sparkles className="size-3.5 text-white/80" />
          </span>
          <div className="flex max-w-md flex-col gap-4 rounded-2xl rounded-tl-sm border border-white/20 bg-white/10 px-4 py-3.5 text-sm font-normal text-white/90">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Compliance
              </span>
              <h3 className="text-base font-semibold text-white">
                CMMC compliance, built for defense contractors
              </h3>
              <p className="leading-relaxed text-white/80">
                Mycroft&apos;s Risk Operations Center removes the operational
                burden, helping you meet all CMMC requirements and secure DoD
                contracts with confidence.
              </p>
              <BookDemo />
            </div>

            <div className="flex flex-col gap-2 border-t border-white/15 pt-3">
              <h4 className="font-semibold text-white">
                Why CMMC matters to you
              </h4>
              <p className="leading-relaxed text-white/80">
                CMMC compliance is required to work with the U.S. Department of
                Defense and its contractors, ensuring your organization protects
                controlled unclassified information.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h5 className="font-medium text-white">
                  Protect contract eligibility
                </h5>
                <p className="leading-relaxed text-white/80">
                  Without CMMC compliance, you cannot bid on or maintain DoD
                  contracts. Certification at Level 1, 2, or 3 is required
                  depending on the sensitivity of the work.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="font-medium text-white">Safeguard sensitive data</h5>
                <p className="leading-relaxed text-white/80">
                  CMMC enforces strict controls to protect controlled
                  unclassified information from breaches and unauthorized access.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="font-medium text-white">
                  Strengthen competitive positioning
                </h5>
                <p className="leading-relaxed text-white/80">
                  Organizations that achieve compliance faster gain an advantage
                  in securing and retaining government contracts.
                </p>
              </div>
            </div>

            <BookDemo />
          </div>
        </div>
      </div>

      {/* Composer: the search input, now docked at the bottom of the dialogue. */}
      <div className="border-t border-white/15 px-3 py-3">
        <div className="flex w-full items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-white">
          <SearchGlyph />
          <input
            type="text"
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // Drop the cursor at the end of the carried-over text.
            onFocus={(e) => {
              const end = e.target.value.length;
              e.target.setSelectionRange(end, end);
            }}
            placeholder={`Ask about ${topic}...`}
            className="w-full bg-transparent text-sm font-normal text-white placeholder:text-white/70 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
