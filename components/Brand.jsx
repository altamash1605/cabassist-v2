import LogoMark from "./LogoMark";

export default function Brand({ size = 36, className = "" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`grid place-items-center rounded-lg bg-neutral-900 ring-1 ring-neutral-800 ${className}`}
    >
      <LogoMark className="h-5 w-5" />
    </div>
  );
}
