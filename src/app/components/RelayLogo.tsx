import { clsx } from 'clsx';

interface RelayLogoProps {
  size?: number;       // pixel size of the square
  className?: string;  // extra wrapper classes
}

/**
 * Relay brand logo — black rounded square with bold white "R".
 * In dark mode, inverts to white bg + black "R".
 */
export function RelayLogo({ size = 32, className }: RelayLogoProps) {
  // Scale the border-radius proportionally (~18% of size, matching Figma's 24/136)
  const radius = Math.round(size * 0.18);
  const fontSize = Math.round(size * 0.58);

  return (
    <div
      className={clsx('relay-logo flex-shrink-0 flex items-center justify-center', className)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: '#000000',
        lineHeight: 1,
      }}
    >
      <span
        style={{
          fontSize,
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginTop: size * 0.02,
        }}
      >
        R
      </span>
    </div>
  );
}
