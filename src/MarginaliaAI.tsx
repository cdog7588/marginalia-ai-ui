import React, { useState, useRef, useCallback } from "react";

// ─── Design Tokens ──────────────────────────────────────────────────────────
const colors = {
  // Header & Chrome
  headerBg: "#191b1f",
  headerBorder: "#2d3139",
  metaPillBg: "#252830",
  textPrimary: "#e2e8f0",
  textSecondary: "#94a3b8",
  textMuted: "#9ca3af",
  textDark: "#2c2a29",

  // AI Accent
  violet: "#8b5cf6",
  violetLight: "#f5f3ff",
  violetBorder: "#8b5cf6",

  // Reader
  readerBg: "#faf8f5",
  readerText: "#2c2a29",

  // Sandbox
  sandboxBg: "#f3f4f6",
  dotGrid: "#d1d5db",
  cardBg: "#ffffff",

  // Chat
  drawerBg: "#f9fafb",
  userMsgBg: "#e2e8f0",
  aiMsgBg: "#ffffff",

  // Badges
  badgeYellow: "#b45309",
  badgeBlue: "#1d4ed8",
  badgeGreen: "#047857",
  badgeOrange: "#ea580c",
  badgeViolet: "#8b5cf6",

  // Status
  green: "#10b981",
  syncBadgeBg: "#1e293b",

  // Sticky
  stickyBg: "#fef08a",
  stickyText: "#451a03",

  // Misc
  divider: "#e5e7eb",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  white: "#ffffff",
  black: "#000000",
};

// ─── Icon Components ────────────────────────────────────────────────────────
const SparkleIcon = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
  </svg>
);

const BookIcon = ({ size = 12, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M1 2.5C1 2.5 2.5 1 6 1C9.5 1 11 2.5 11 2.5V10.5C11 10.5 9.5 9.5 6 9.5C2.5 9.5 1 10.5 1 10.5V2.5Z" />
    <path d="M6 1V9.5" />
  </svg>
);

const UploadCloudIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M6 8V3M4 5L6 3L8 5" />
    <path d="M2 8.5C1.5 8 1 7 1.5 5.5C2 4 3.5 3.5 4.5 3.5C5 2 6.5 1 8 1.5C9.5 2 10 3.5 10 4.5C11 5 11.5 6 11 7.5C10.5 8.5 10 8.5 10 8.5" />
  </svg>
);

const ChevronLeft = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M7.5 3L4.5 6L7.5 9" />
  </svg>
);

const ChevronRight = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4.5 3L7.5 6L4.5 9" />
  </svg>
);

const CursorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M3 2L13 8L8 9L6 14L3 2Z" />
  </svg>
);

const PenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 2L14 4L5 13L2 14L3 11L12 2Z" />
  </svg>
);

const HighlighterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M10 2L14 6L7 13H3V9L10 2Z" />
    <path d="M2 14H14" />
  </svg>
);

const StickyNoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M3 2H13V11L10 14H3V2Z" />
    <path d="M10 11V14L13 11H10Z" />
  </svg>
);

const MediaCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="2" y="3" width="12" height="10" rx="1" />
    <circle cx="5.5" cy="6.5" r="1.5" />
    <path d="M2 11L5 8L8 11L11 9L14 12" />
  </svg>
);

const ConnectorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="3" cy="3" r="2" />
    <circle cx="13" cy="13" r="2" />
    <path d="M5 3H8C10.2 3 12 5 12 7V11" />
  </svg>
);

const MaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={colors.gray600} strokeWidth="1.2">
    <path d="M2 5V2H5M9 2H12V5M12 9V12H9M5 12H2V9" />
  </svg>
);

const PlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
    <path d="M13 1L6 8M13 1L9 13L6 8L1 5L13 1Z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={colors.gray600} strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3L9 9M9 3L3 9" />
  </svg>
);

const WandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={colors.violet} strokeWidth="1.2">
    <path d="M10 1L13 4M2 9L9 2L12 5L5 12L2 9Z" />
    <path d="M7 1L8 0M12 5L13 4M1 8L0 9" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={colors.gray500} strokeWidth="1.2">
    <circle cx="8" cy="8" r="6" />
    <circle cx="6" cy="6" r="1" fill={colors.gray500} />
    <circle cx="10" cy="6" r="1" fill={colors.gray500} />
    <circle cx="7" cy="10" r="1" fill={colors.gray500} />
  </svg>
);

// ─── Inline Badge ───────────────────────────────────────────────────────────
const InlineBadge = ({ color }: { color: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: color + "20",
      marginLeft: 2,
      marginRight: 2,
      verticalAlign: "super",
      fontSize: 0,
      lineHeight: 0,
      position: "relative",
      top: -2,
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: color,
        display: "block",
      }}
    />
  </span>
);

// ─── Citation Chip ──────────────────────────────────────────────────────────
const CitationChip = ({ text }: { text: string }) => (
  <span
    style={{
      display: "inline",
      padding: "1px 5px",
      backgroundColor: colors.violetLight,
      color: colors.violet,
      fontSize: 11,
      borderRadius: 4,
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
    }}
  >
    {text}
  </span>
);

// ═══════════════════════════════════════════════════════════════════════════
// HEADER BAR
// ═══════════════════════════════════════════════════════════════════════════
const HeaderBar = () => {
  const progressPercent = (42 / 528) * 100;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 52,
        backgroundColor: colors.headerBg,
        padding: "0 16px",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Left cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: colors.violet,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SparkleIcon size={14} color="white" />
          </div>
          <span
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Marginalia AI
          </span>
        </div>

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 16,
            backgroundColor: colors.headerBorder,
          }}
        />

        {/* Meta pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.metaPillBg,
            borderRadius: 12,
            padding: "4px 12px 4px 10px",
          }}
        >
          <BookIcon size={12} color={colors.textSecondary} />
          <span
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Cognitive Architectures — D. Kahneman
          </span>
          <span
            style={{
              color: colors.textSecondary,
              fontSize: 11,
              fontFamily: "'Inter', sans-serif",
              marginLeft: 4,
            }}
          >
            .EPUB
          </span>
        </div>

        {/* Upload button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "transparent",
            border: `1px solid ${colors.headerBorder}`,
            borderRadius: 6,
            padding: "4px 12px 4px 10px",
            color: colors.textPrimary,
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          <UploadCloudIcon size={12} />
          Upload
        </button>
      </div>

      {/* Center – Page navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          style={{
            width: 28,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: `1px solid ${colors.headerBorder}`,
            borderRadius: 4,
            cursor: "pointer",
            color: colors.textPrimary,
          }}
        >
          <ChevronLeft />
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Page 42 of 528
          </div>
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 10,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            (CFI /6/14)
          </div>
        </div>
        <button
          style={{
            width: 28,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: `1px solid ${colors.headerBorder}`,
            borderRadius: 4,
            cursor: "pointer",
            color: colors.textPrimary,
          }}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Right cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Sync badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.syncBadgeBg,
            borderRadius: 12,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.green,
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: colors.textPrimary,
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Dossier Synced
          </span>
        </div>

        {/* Generate button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.violet,
            border: "none",
            borderRadius: 8,
            padding: "6px 16px",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          ✦ Generate Page Brief
        </button>

        {/* AI Companion toggle */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.violetLight,
            border: "none",
            borderRadius: 8,
            padding: "6px 12px",
            color: colors.violet,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          <WandIcon />
          AI Companion
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: colors.headerBorder,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: colors.violet,
          }}
        />
      </div>
    </header>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// READER PANE
// ═══════════════════════════════════════════════════════════════════════════
const ContextPopover = () => {
  const actions = [
    { label: "Note", icon: "✏️" },
    { label: "Video", icon: "▶" },
    { label: "Web", icon: "🌐" },
    { label: "waveform", icon: "〰" },
  ];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        backgroundColor: colors.headerBg,
        borderRadius: 20,
        padding: "6px 4px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        position: "absolute",
        bottom: -48,
        left: 80,
        zIndex: 10,
      }}
    >
      {actions.map((action) => (
        <button
          key={action.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 14,
            padding: "4px 10px",
            color: colors.textPrimary,
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 10 }}>{action.icon}</span>
          {action.label}
        </button>
      ))}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          backgroundColor: colors.violet,
          border: "none",
          borderRadius: 14,
          padding: "4px 10px",
          color: "white",
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 10 }}>✦</span>
        Ask
      </button>
    </div>
  );
};

const ReaderPane = () => (
  <div
    style={{
      width: "45%",
      minWidth: 400,
      backgroundColor: colors.readerBg,
      overflowY: "auto",
      padding: "40px 48px",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    }}
  >
    {/* Chapter header */}
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: colors.violet,
          marginBottom: 6,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Chapter 2: Two Systems
      </div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 500,
          color: colors.textDark,
          margin: 0,
          lineHeight: 1.2,
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        }}
      >
        The Architecture of Mind
      </h1>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.divider,
          marginTop: 12,
        }}
      />
    </div>

    {/* Paragraph 1 */}
    <p
      style={{
        fontSize: 18,
        lineHeight: 1.7,
        color: colors.readerText,
        marginBottom: 20,
        maxWidth: 549,
      }}
    >
      To observe the cognitive landscape is to encounter a constant interplay
      between fast, automatic reactions and slow, deliberate calculations.
      Kahneman defines these operations as two distinct agents within the
      architecture of mind: System 1, which runs automatically and out of
      conscious awareness, and System 2, which allocates resources to effortful
      mental activities.
      <InlineBadge color={colors.badgeYellow} />
      {" "}System 1 continuously generates intuitive impressions, feelings, and
      inclinations for System 2 to endorse or reject.
    </p>

    {/* Paragraph 2 with popover */}
    <div style={{ position: "relative", marginBottom: 20 }}>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: colors.readerText,
          maxWidth: 549,
          margin: 0,
        }}
      >
        Most of the time, the division of labor is highly efficient. System 2
        adopts the suggestions of System 1 with little or no modification. You
        generally believe your impressions
        <InlineBadge color={colors.badgeBlue} /> and act on your desires, which
        is fine because{" "}
        <span
          style={{
            backgroundColor: "#8b5cf620",
            borderRadius: 2,
            padding: "1px 0",
          }}
        >
          System 1 is generally
        </span>
        <InlineBadge color={colors.badgeViolet} /> highly adept at navigating
        familiar situations, detecting subtle patterns, and identifying casual
        relations with remarkable speed. However, System 1 has systematic biases
        that it is prone to commit under specific conditions, and it often
        answers easier questions than the ones asked.
        <InlineBadge color={colors.badgeGreen} />
        <InlineBadge color={colors.badgeOrange} />
      </p>
      <ContextPopover />
    </div>

    {/* Paragraph 3 */}
    <p
      style={{
        fontSize: 18,
        lineHeight: 1.7,
        color: colors.readerText,
        marginTop: 48,
        maxWidth: 549,
      }}
    >
      When System 1 runs into difficulty, it calls on System 2 to support more
      detailed and specific processing that may solve the problem of the moment.
      <InlineBadge color={colors.badgeGreen} /> System 2 is activated when an
      event is detected that violates the model of the world that System 1
      maintains. In these moments, cognitive conflict demands the conscious
      attention and effort that only the deliberate system can deploy.
      <InlineBadge color={colors.badgeOrange} /> This represents a crucial
      cognitive bottleneck in higher education learning.
      <InlineBadge color={colors.badgeViolet} />
    </p>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SPLIT DIVIDER
// ═══════════════════════════════════════════════════════════════════════════
const SplitDivider = ({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) => (
  <div
    onMouseDown={onMouseDown}
    style={{
      width: 6,
      backgroundColor: colors.divider,
      cursor: "col-resize",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      flexShrink: 0,
      position: "relative",
    }}
  >
    {/* Chevron left */}
    <div
      style={{
        width: 8,
        height: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "calc(50% - 20px)",
        cursor: "pointer",
      }}
    >
      <ChevronLeft size={8} />
    </div>

    {/* Grab dots */}
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: colors.textMuted,
          }}
        />
      ))}
    </div>

    {/* Chevron right */}
    <div
      style={{
        width: 8,
        height: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "calc(50% + 14px)",
        cursor: "pointer",
      }}
    >
      <ChevronRight size={8} />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SANDBOX PANE
// ═══════════════════════════════════════════════════════════════════════════
const DotGrid = () => {
  const rows = 15;
  const cols = 20;
  const spacing = 26;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          style={{
            position: "absolute",
            top: 12 + row * spacing,
            left: 12,
            display: "flex",
            gap: spacing - 2,
          }}
        >
          {Array.from({ length: cols }).map((_, col) => (
            <div
              key={col}
              style={{
                width: 2,
                height: 2,
                borderRadius: 1,
                backgroundColor: colors.dotGrid,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const ToolDock = () => {
  const tools = [
    { icon: <CursorIcon />, active: true, label: "Select" },
    { icon: <PenIcon />, active: false, label: "Pen" },
    { icon: <HighlighterIcon />, active: false, label: "Highlighter" },
    { icon: <StickyNoteIcon />, active: false, label: "Sticky" },
    { icon: <MediaCardIcon />, active: false, label: "Media" },
    { icon: <ConnectorIcon />, active: false, label: "Connector" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 6,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        position: "absolute",
        top: 52,
        left: 24,
        zIndex: 5,
      }}
    >
      {tools.map((tool) => (
        <button
          key={tool.label}
          title={tool.label}
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            border: "none",
            backgroundColor: tool.active ? colors.violetLight : "transparent",
            color: tool.active ? colors.violet : colors.gray600,
            cursor: "pointer",
          }}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

const ZoomControls = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 6,
      boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      position: "absolute",
      bottom: 24,
      right: 24,
      zIndex: 5,
    }}
  >
    <button
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        border: "none",
        backgroundColor: colors.gray100,
        color: colors.gray600,
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      −
    </button>
    <span
      style={{
        color: colors.gray600,
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        minWidth: 30,
        textAlign: "center",
      }}
    >
      94%
    </span>
    <button
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        border: "none",
        backgroundColor: colors.gray100,
        color: colors.gray600,
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      +
    </button>
    <div
      style={{
        width: 1,
        height: 12,
        backgroundColor: colors.divider,
      }}
    />
    <button
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <MaximizeIcon />
    </button>
  </div>
);

// ─── Canvas Cards ───────────────────────────────────────────────────────────
const VideoCard = () => (
  <div
    style={{
      width: 260,
      backgroundColor: colors.cardBg,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      position: "absolute",
      top: 120,
      left: 40,
    }}
  >
    {/* Thumbnail */}
    <div
      style={{
        width: "100%",
        height: 100,
        backgroundColor: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlayIcon size={20} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 4,
          padding: "2px 6px",
          color: "white",
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        12:34
      </div>
    </div>

    {/* Content */}
    <div style={{ padding: 12 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: colors.textDark,
          marginBottom: 8,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.3,
        }}
      >
        Mechanisms Breakdown — Dual Process Theory
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.gray500,
          lineHeight: 1.5,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        • Explains the metabolic cost of System 2 activation.
        <br />• Highlights pupil dilation as a direct physical proxy.
      </div>
    </div>
  </div>
);

const DiagramCard = () => (
  <div
    style={{
      display: "flex",
      gap: 12,
      position: "absolute",
      top: 345,
      left: 45,
    }}
  >
    {/* Sketch */}
    <div
      style={{
        width: 200,
        height: 180,
        backgroundColor: colors.cardBg,
        borderRadius: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        padding: 12,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: colors.textMuted,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Sketch: Flow Architecture
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            border: `2px solid ${colors.violet}`,
            borderRadius: 8,
            color: colors.violet,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          S1: Fast / Intuitive
        </div>
        <svg width="2" height="24">
          <line x1="1" y1="0" x2="1" y2="24" stroke={colors.gray500} strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
        <div
          style={{
            padding: "8px 20px",
            border: `2px solid ${colors.gray600}`,
            borderRadius: 8,
            color: colors.gray600,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          S2: Slow / Effortful
        </div>
      </div>
    </div>

    {/* Sticky note */}
    <div
      style={{
        width: 128,
        minHeight: 150,
        backgroundColor: colors.stickyBg,
        borderRadius: 4,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transform: "rotate(1deg)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: colors.stickyText,
          marginBottom: 8,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.3,
        }}
      >
        Note — Kahneman vs. Gigerenzer
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.stickyText,
          lineHeight: 1.5,
          fontFamily: "'Caveat', 'Patrick Hand', cursive",
        }}
      >
        Is S1 actually &quot;biased&quot;, or just heuristically optimized for
        ecology?
      </div>
    </div>
  </div>
);

const DossierCard = () => (
  <div
    style={{
      width: 340,
      backgroundColor: colors.cardBg,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      position: "absolute",
      top: 120,
      right: 80,
    }}
  >
    {/* Violet top border */}
    <div
      style={{
        height: 4,
        backgroundColor: colors.violet,
      }}
    />

    <div style={{ padding: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <SparkleIcon size={14} color={colors.violet} />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.violet,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          AI Page Dossier — Page 42
        </span>
      </div>

      {/* Section 1: Key Concepts */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: colors.gray500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Key Concept Extractions
        </div>
        {[
          "System 1 Defaulting: Brain seeks least metabolic effort; endorses impressions automatically.",
          "Conflict Detection: System 2 is reactionary, only waking up when expectations are violated.",
          "Attribute Substitution: Answering easier questions to save processing energy.",
        ].map((text, i) => (
          <div
            key={i}
            style={{
              fontSize: 13,
              color: colors.textDark,
              lineHeight: 1.5,
              marginBottom: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            • {text}
          </div>
        ))}
      </div>

      {/* Section 2: Misconceptions */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: colors.gray500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Potential Misconceptions
        </div>
        {[
          "S1 and S2 are conceptual metaphors, not physical, discrete brain structures.",
          'System 1 is not "bad" or "irrational"—it is highly optimized for survival situations.',
        ].map((text, i) => (
          <div
            key={i}
            style={{
              fontSize: 13,
              color: colors.textDark,
              lineHeight: 1.5,
              marginBottom: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            • {text}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.divider,
          marginBottom: 16,
        }}
      />

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "transparent",
            border: `1px solid ${colors.divider}`,
            borderRadius: 16,
            padding: "5px 14px",
            color: colors.gray600,
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          Download PDF Brief
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "transparent",
            border: `1px solid ${colors.violet}`,
            borderRadius: 16,
            padding: "5px 14px",
            color: colors.violet,
            fontSize: 12,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          Insert into Canvas
        </button>
      </div>
    </div>
  </div>
);

const SandboxPane = () => (
  <div
    style={{
      flex: 1,
      backgroundColor: colors.sandboxBg,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <DotGrid />

    {/* Canvas header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "20px 24px 0",
        position: "relative",
        zIndex: 2,
      }}
    >
      <PaletteIcon />
      <span
        style={{
          color: colors.gray500,
          fontSize: 13,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Visual Sandbox — Cognitive Dualism
      </span>
    </div>

    <ToolDock />
    <ZoomControls />
    <VideoCard />
    <DiagramCard />
    <DossierCard />

    {/* Connector lines (visual only) */}
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <path
        d="M0 200 C60 200, 80 160, 120 160"
        stroke={colors.violet}
        strokeWidth="1.5"
        fill="none"
        opacity="0.2"
        strokeDasharray="4 4"
      />
      <path
        d="M0 380 C120 380, 200 300, 260 280"
        stroke={colors.badgeBlue}
        strokeWidth="1.5"
        fill="none"
        opacity="0.15"
        strokeDasharray="4 4"
      />
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// AI COMPANION DRAWER
// ═══════════════════════════════════════════════════════════════════════════
const AICompanionDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        width: 340,
        height: "100%",
        backgroundColor: colors.drawerBg,
        borderLeft: `1px solid ${colors.divider}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxShadow: "-4px 0 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Context header */}
      <div
        style={{
          backgroundColor: colors.white,
          padding: 16,
          borderBottom: `1px solid ${colors.divider}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <SparkleIcon size={14} color={colors.violet} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.textDark,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              AI Scholar-Companion
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.gray100,
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div
          style={{
            fontSize: 11,
            color: colors.textMuted,
            marginBottom: 6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Active Context (4 Items)
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {["Page 42 text", "Video transcript", "User sketch", "Web link"].map(
            (chip) => (
              <span
                key={chip}
                style={{
                  fontSize: 11,
                  color: colors.gray600,
                  backgroundColor: colors.gray100,
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {chip}
              </span>
            )
          )}
        </div>
      </div>

      {/* Chat stream */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* User message 1 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div
            style={{
              backgroundColor: colors.userMsgBg,
              borderRadius: 12,
              padding: "10px 14px",
              maxWidth: "85%",
              fontSize: 13,
              color: colors.textDark,
              lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Is Kahneman arguing that System 1 is inherently flawed, or is it
            just optimized for speed over accuracy?
          </div>
          <span
            style={{
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            12:44 PM
          </span>
        </div>

        {/* AI response */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              backgroundColor: colors.aiMsgBg,
              borderRadius: 12,
              padding: "10px 14px",
              maxWidth: "90%",
              fontSize: 13,
              color: colors.textDark,
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
              border: `1px solid ${colors.divider}`,
            }}
          >
            He argues System 1 is a highly efficient evolutionary optimization
            rather than a simple defect{" "}
            <CitationChip text="p.42, ¶3" />. It uses ecological
            heuristics that work flawlessly in familiar terrain. Biases emerge
            primarily when its fast-matching mechanisms are applied to abstract
            statistical problems that actually require systemic calculations{" "}
            <CitationChip text="p.42, ¶2" />.
          </div>
          <span
            style={{
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Marginalia AI • 12:45 PM
          </span>
        </div>

        {/* User message 2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div
            style={{
              backgroundColor: colors.userMsgBg,
              borderRadius: 12,
              padding: "10px 14px",
              maxWidth: "85%",
              fontSize: 13,
              color: colors.textDark,
              lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            How does the sketch I drew connect to metabolic exhaustion?
          </div>
          <span
            style={{
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            12:46 PM
          </span>
        </div>
      </div>

      {/* Input area */}
      <div
        style={{
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.divider}`,
          padding: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.gray100,
            borderRadius: 24,
            padding: "8px 8px 8px 16px",
          }}
        >
          <span
            style={{
              flex: 1,
              fontSize: 13,
              color: colors.textMuted,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Inquire about this passage, test your understanding...
          </span>
          <button
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.violet,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
const MarginaliaAI: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [splitRatio, setSplitRatio] = useState(0.45);
  const isDragging = useRef(false);

  const handleDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      const startX = e.clientX;
      const startRatio = splitRatio;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;
        const containerWidth = window.innerWidth;
        const drawerWidth = drawerOpen ? 340 : 0;
        const availableWidth = containerWidth - drawerWidth;
        const delta = moveEvent.clientX - startX;
        const newRatio = Math.max(
          0.25,
          Math.min(0.7, startRatio + delta / availableWidth)
        );
        setSplitRatio(newRatio);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [splitRatio, drawerOpen]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        backgroundColor: colors.sandboxBg,
      }}
    >
      <HeaderBar />

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div style={{ width: `${splitRatio * 100}%`, display: "flex" }}>
          <ReaderPane />
        </div>

        <SplitDivider onMouseDown={handleDividerMouseDown} />

        <SandboxPane />

        <AICompanionDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </div>
  );
};

export default MarginaliaAI;
