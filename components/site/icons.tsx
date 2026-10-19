type IconProps = { className?: string; "aria-hidden"?: boolean };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} fill="none" aria-hidden="true">
      <path
        d="M7 17 L17 7 M9 7 H17 V15"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} fill="none" aria-hidden="true">
      <path
        d="M4 12 H20 M14 6 L20 12 L14 18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} fill="none" aria-hidden="true">
      <path
        d="M12 4 V20 M6 14 L12 20 L18 14"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} fill="none" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="M15 5.5 V4.5 A1.5 1.5 0 0 0 13.5 3 H4.5 A1.5 1.5 0 0 0 3 4.5 V13.5 A1.5 1.5 0 0 0 4.5 15 H5.5" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} fill="none" aria-hidden="true">
      <path
        d="M4 12.5 L9.5 18 L20 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-5"} fill="none" aria-hidden="true">
      <path d="M3 6 H21 M3 12 H21 M3 18 H21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-5"} fill="none" aria-hidden="true">
      <path d="M4 4 L20 20 M20 4 L4 20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" />
    </svg>
  );
}

export function CoinMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className ?? "size-9"} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r="14.5"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeDasharray="1.5 5"
        opacity="0.6"
      />
      <circle cx="18" cy="22" r="2.6" fill="var(--color-ink)" />
      <circle cx="30" cy="22" r="2.6" fill="var(--color-ink)" />
      <path
        d="M17 28 Q24 35 31 28"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UpTriangle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" className={className ?? "size-3"} aria-hidden="true">
      <path d="M6 1 L11 10 H1 Z" fill="currentColor" />
    </svg>
  );
}
