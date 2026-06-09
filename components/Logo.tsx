import Image from "next/image";

interface LogoProps {
  variant?: "horizontal" | "icon";
  height?: number;
  className?: string;
}

export function Logo({ variant = "horizontal", height = 40, className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Image
        src="/logo-icon.png"
        alt="Omega Workforce"
        width={height}
        height={height}
        className={className}
        priority
      />
    );
  }

  // horizontal — oryginalny plik PNG ma proporcje ~5.2:1
  const width = Math.round(height * 5.2);
  return (
    <Image
      src="/logo-horizontal.png"
      alt="Omega Workforce — staffing · outsourcing · recruitment"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
