import { cn } from '@/utils/cn';

type LogoVariant = 'full' | 'mark';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  imageClassName?: string;
}

const sources: Record<LogoVariant, { light: string; dark: string; width: number; height: number }> = {
  full: {
    light: '/logo-full-light.png',
    dark: '/logo-full-dark.png',
    width: 955,
    height: 830,
  },
  mark: {
    light: '/logo-mark-light.png',
    dark: '/logo-mark-dark.png',
    width: 530,
    height: 615,
  },
};

export function Logo({ variant = 'full', className, imageClassName }: LogoProps) {
  const { light, dark, width, height } = sources[variant];

  return (
    <picture className={cn('inline-block leading-none', className)}>
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img
        src={light}
        alt="Mood Map"
        width={width}
        height={height}
        className={cn('block h-auto w-full max-w-full object-contain', imageClassName)}
        decoding="async"
      />
    </picture>
  );
}
