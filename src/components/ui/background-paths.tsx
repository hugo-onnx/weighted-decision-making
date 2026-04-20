"use client";

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function FloatingPaths({ position }: { position: number }) {
  const maskId = `background-paths-title-mask-${position > 0 ? 'forward' : 'reverse'}`;
  const blurId = `background-paths-title-blur-${position > 0 ? 'forward' : 'reverse'}`;
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    opacity: Math.min(0.42, 0.08 + i * 0.01),
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        aria-hidden="true"
        className="h-full w-full text-slate-950 dark:text-white"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 696 316"
      >
        <defs>
          <filter
            height="200%"
            id={blurId}
            width="200%"
            x="-50%"
            y="-50%"
          >
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <mask height="316" id={maskId} maskUnits="userSpaceOnUse" width="696" x="0" y="0">
            <rect fill="white" height="316" width="696" />
            <rect
              fill="black"
              filter={`url(#${blurId})`}
              height="146"
              opacity="0.86"
              rx="72"
              width="592"
              x="52"
              y="66"
            />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {paths.map((path) => (
            <motion.path
              animate={{
                opacity: [0.28, 0.62, 0.28],
                pathLength: 1,
                pathOffset: [0, 1, 0],
              }}
              d={path.d}
              initial={{ opacity: 0.46, pathLength: 0.3 }}
              key={path.id}
              stroke="currentColor"
              strokeOpacity={path.opacity}
              strokeWidth={path.width}
              transition={{
                duration: 20 + Math.random() * 10,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  ctaLabel = 'Discover Excellence',
  headingId,
  onCtaClick,
  subtitle,
  title = 'Background Paths',
}: {
  ctaLabel?: string;
  headingId?: string;
  onCtaClick?: () => void;
  subtitle?: string;
  title?: string;
}) {
  const words = title.split(' ');

  return (
    <section
      aria-labelledby={headingId}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-white text-slate-950 dark:bg-neutral-950 dark:text-white"
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          animate={{ opacity: 1 }}
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <h1
            aria-label={title}
            className="mb-8 text-5xl font-bold tracking-normal drop-shadow-[0_2px_18px_rgba(255,255,255,0.95)] sm:text-7xl md:text-8xl dark:drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
            id={headingId}
          >
            {words.map((word, wordIndex) => (
              <span
                aria-hidden="true"
                className="mr-4 inline-block last:mr-0"
                key={`${wordIndex}-${word}`}
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                    initial={{ opacity: 0, y: 100 }}
                    key={`${wordIndex}-${letterIndex}-${letter}`}
                    transition={{
                      damping: 25,
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      stiffness: 150,
                      type: 'spring',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {subtitle ? (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-9 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-white/65"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
            <Button
              className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-md group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black dark:hover:shadow-neutral-800/50"
              onClick={onCtaClick}
              variant="ghost"
            >
              <span className="opacity-90 transition-opacity group-hover:opacity-100">
                {ctaLabel}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="ml-3 size-5 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100"
              />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
