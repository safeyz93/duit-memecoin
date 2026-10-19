import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonTone = "lime" | "pink" | "gold" | "paper" | "ink";
export type ButtonSize = "sm" | "md" | "lg";

const tones: Record<ButtonTone, string> = {
  lime: "bg-lime text-ink border-ink shadow-hard",
  pink: "bg-pink text-white border-ink shadow-hard",
  gold: "bg-gold text-ink border-ink shadow-hard",
  paper: "bg-paper text-ink border-ink shadow-hard",
  ink: "bg-ink text-paper border-paper shadow-hard",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-7 py-4 text-sm sm:px-9 sm:text-base",
};

export function buttonStyles({
  tone = "lime",
  size = "md",
  className,
}: {
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "group/btn inline-flex select-none items-center justify-center gap-2 border-[3px] font-body font-extrabold uppercase tracking-[0.08em]",
    "transition-[transform,box-shadow,background-color,color] duration-100 ease-out",
    "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard-lg",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime",
    "disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
    tones[tone],
    sizes[size],
    className,
  );
}

type CommonProps = {
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
};

export function Button({
  tone = "lime",
  size = "md",
  className,
  children,
  icon,
  ...props
}: CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  return (
    <button type="button" className={buttonStyles({ tone, size, className })} {...props}>
      {children}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </button>
  );
}

export function ButtonLink({
  tone = "lime",
  size = "md",
  className,
  children,
  icon,
  ...props
}: CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">) {
  return (
    <a className={buttonStyles({ tone, size, className })} {...props}>
      {children}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </a>
  );
}
